var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
import cookie from "cookie";
import { v4 } from "@lukeed/uuid";
import { v4 as v4$1 } from "uuid";
import "axios";
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key in obj) {
    clone[key.toLowerCase()] = obj[key];
  }
  return clone;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
const subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue$1.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
const escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
const escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
const s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${page && page.path ? try_serialize(page.path, (error3) => {
      throw new Error(`Failed to serialize page.path: ${error3.message}`);
    }) : null},
						query: new URLSearchParams(${page && page.query ? s$1(page.query.toString()) : ""}),
						params: ${page && page.params ? try_serialize(page.params, (error3) => {
      throw new Error(`Failed to serialize page.params: ${error3.message}`);
    }) : null}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
const s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const prefix = options2.paths.assets || options2.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
const absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
class ReadOnlyFormData {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
}
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
const boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, classes_to_add) {
  const attributes = Object.assign({}, ...args);
  if (classes_to_add) {
    if (attributes.class == null) {
      attributes.class = classes_to_add;
    } else {
      attributes.class += " " + classes_to_add;
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var root_svelte_svelte_type_style_lang = "";
const css = {
  code: "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}",
  map: null
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
let base = "";
let assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
const handle = async ({ request, resolve: resolve2 }) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await resolve2(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
const template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/Images/DH.svg" />\r\n		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css">\r\n\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		<meta name="description" content="Welcome to my portfolio where you can see my latest projects, resume, and even contact me"/>\r\n		<title>David M. Hanlon</title>\r\n		' + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte" class="app">' + body + "</div>\r\n	</body>\r\n</html>\r\n\r\n<style>\r\n	/* attempting to remove focus on mouse click but keep for tab*/\r\n	.app:focus:not(:focus-visible){\r\n		outline: none;\r\n	}\r\n</style>";
let options = null;
const default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-9d62e4a5.js",
      css: [assets + "/_app/assets/start-464e9d0a.css"],
      js: [assets + "/_app/start-9d62e4a5.js", assets + "/_app/chunks/vendor-96868851.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
const empty = () => ({});
const manifest = {
  assets: [{ "file": ".DS_Store", "size": 8196, "type": null }, { "file": "Images/.DS_Store", "size": 10244, "type": null }, { "file": "Images/A.svg", "size": 2971, "type": "image/svg+xml" }, { "file": "Images/B.svg", "size": 3258, "type": "image/svg+xml" }, { "file": "Images/DH.png", "size": 4890, "type": "image/png" }, { "file": "Images/DH.svg", "size": 2062, "type": "image/svg+xml" }, { "file": "Images/chatApp.png", "size": 539642, "type": "image/png" }, { "file": "Images/chatAppCardImg.png", "size": 415052, "type": "image/png" }, { "file": "Images/computerBg.jpg", "size": 1783504, "type": "image/jpeg" }, { "file": "Images/cybrary1.png", "size": 3727, "type": "image/png" }, { "file": "Images/cybrary2.png", "size": 2850, "type": "image/png" }, { "file": "Images/cybrary3.png", "size": 2641, "type": "image/png" }, { "file": "Images/d_icon.png", "size": 11419, "type": "image/png" }, { "file": "Images/davidHanlon.jpg", "size": 396379, "type": "image/jpeg" }, { "file": "Images/davidHanlon.svg", "size": 2720, "type": "image/svg+xml" }, { "file": "Images/educationClipArt.jpg", "size": 30319, "type": "image/jpeg" }, { "file": "Images/endeavorsTvCardImg.png", "size": 844318, "type": "image/png" }, { "file": "Images/etsLogo.png", "size": 5095, "type": "image/png" }, { "file": "Images/expenseTracker.png", "size": 37239, "type": "image/png" }, { "file": "Images/expenseTrackerCardImg.png", "size": 47026, "type": "image/png" }, { "file": "Images/hero.svg", "size": 21478, "type": "image/svg+xml" }, { "file": "Images/loveCalc.png", "size": 79869, "type": "image/png" }, { "file": "Images/loveCalcCardImg.png", "size": 56690, "type": "image/png" }, { "file": "Images/minionClipArt.jpeg", "size": 8286, "type": "image/jpeg" }, { "file": "Images/needToEdit.png", "size": 895291, "type": "image/png" }, { "file": "Images/nextJsCardImg.png", "size": 154294, "type": "image/png" }, { "file": "Images/originalPortfolioCardImg.png", "size": 132269, "type": "image/png" }, { "file": "Images/phsLogo.jpeg", "size": 238136, "type": "image/jpeg" }, { "file": "Images/pinokioClipArt.png", "size": 13702, "type": "image/png" }, { "file": "Images/profilePic.png", "size": 274937, "type": "image/png" }, { "file": "Images/projectImages/Screen Shot 2021-09-20 at 8.36.03 PM.png", "size": 628963, "type": "image/png" }, { "file": "Images/projectImages/Screen Shot 2021-09-20 at 8.36.29 PM.png", "size": 864248, "type": "image/png" }, { "file": "Images/projectImages/Screen Shot 2021-09-20 at 8.36.55 PM.png", "size": 501810, "type": "image/png" }, { "file": "Images/projectImages/Screen Shot 2021-09-20 at 8.37.20 PM.png", "size": 596027, "type": "image/png" }, { "file": "Images/projectImages/Screen Shot 2021-09-22 at 1.34.59 PM.png", "size": 1021027, "type": "image/png" }, { "file": "Images/projectImages/chatAppProject.webp", "size": 60196, "type": "image/webp" }, { "file": "Images/projectImages/davidHPortfolio.webp", "size": 110902, "type": "image/webp" }, { "file": "Images/projectImages/expenseTrackerProject.webp", "size": 10606, "type": "image/webp" }, { "file": "Images/projectImages/loveCalculatorProject.webp", "size": 28630, "type": "image/webp" }, { "file": "Images/projectImages/nextJsProject.webp", "size": 60784, "type": "image/webp" }, { "file": "Images/projectImages/sleeplessGamersProject.webp", "size": 203294, "type": "image/webp" }, { "file": "Images/sbdLogo.jpg", "size": 9598, "type": "image/jpeg" }, { "file": "Images/softEngClip.jpg", "size": 41213, "type": "image/jpeg" }, { "file": "Images/softEngClip2.png", "size": 39138, "type": "image/png" }, { "file": "Images/sproutLogo1.png", "size": 2623, "type": "image/png" }, { "file": "Images/sproutLogo2.png", "size": 8881, "type": "image/png" }, { "file": "Images/towsonLogo1.png", "size": 8929, "type": "image/png" }, { "file": "Images/towsonLogo2.jpeg", "size": 4179, "type": "image/jpeg" }, { "file": "Images/work1ClipArt.png", "size": 2708, "type": "image/png" }, { "file": "Images/wthsLogo1.jpg", "size": 519344, "type": "image/jpeg" }, { "file": "Resume/.DS_Store", "size": 6148, "type": null }, { "file": "Resume/DavidHanlonResume.pdf", "size": 69402, "type": "application/pdf" }, { "file": "favicon.ico", "size": 1150, "type": "image/vnd.microsoft.icon" }, { "file": "robots.txt", "size": 70, "type": "text/plain" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/blockchain\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/blockchain.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/experience\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/experience.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/projects\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/projects.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/contact\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/contact.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/skills\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/skills.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
const get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
const module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/blockchain.svelte": () => Promise.resolve().then(function() {
    return blockchain;
  }),
  "src/routes/experience.svelte": () => Promise.resolve().then(function() {
    return experience;
  }),
  "src/routes/projects.svelte": () => Promise.resolve().then(function() {
    return projects;
  }),
  "src/routes/contact.svelte": () => Promise.resolve().then(function() {
    return contact;
  }),
  "src/routes/skills.svelte": () => Promise.resolve().then(function() {
    return skills;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  })
};
const metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-53c57dc3.js", "css": ["assets/pages/__layout.svelte-34d3cd38.css"], "js": ["pages/__layout.svelte-53c57dc3.js", "chunks/vendor-96868851.js", "chunks/Button-bf526c8f.js", "chunks/Icon-5ffe7568.js", "chunks/github-a8e17420.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-70e94bbb.js", "css": [], "js": ["error.svelte-70e94bbb.js", "chunks/vendor-96868851.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-f0bb032c.js", "css": [], "js": ["pages/index.svelte-f0bb032c.js", "chunks/vendor-96868851.js", "chunks/Image-0ddfdca8.js", "chunks/Button-bf526c8f.js", "chunks/Icon-5ffe7568.js", "chunks/github-a8e17420.js", "chunks/Container-934b6593.js", "chunks/Divider-d10ac2f6.js"], "styles": [] }, "src/routes/blockchain.svelte": { "entry": "pages/blockchain.svelte-d0509ef3.js", "css": [], "js": ["pages/blockchain.svelte-d0509ef3.js", "chunks/vendor-96868851.js", "chunks/Container-934b6593.js"], "styles": [] }, "src/routes/experience.svelte": { "entry": "pages/experience.svelte-16493e6a.js", "css": [], "js": ["pages/experience.svelte-16493e6a.js", "chunks/vendor-96868851.js", "chunks/Container-934b6593.js", "chunks/Image-0ddfdca8.js", "chunks/Icon-5ffe7568.js", "chunks/Divider-d10ac2f6.js"], "styles": [] }, "src/routes/projects.svelte": { "entry": "pages/projects.svelte-6374016f.js", "css": [], "js": ["pages/projects.svelte-6374016f.js", "chunks/vendor-96868851.js", "chunks/Container-934b6593.js", "chunks/Icon-5ffe7568.js", "chunks/Divider-d10ac2f6.js", "chunks/Button-bf526c8f.js", "chunks/Image-0ddfdca8.js"], "styles": [] }, "src/routes/contact.svelte": { "entry": "pages/contact.svelte-c1ac312b.js", "css": [], "js": ["pages/contact.svelte-c1ac312b.js", "chunks/vendor-96868851.js", "chunks/Button-bf526c8f.js", "chunks/Icon-5ffe7568.js", "chunks/Container-934b6593.js"], "styles": [] }, "src/routes/skills.svelte": { "entry": "pages/skills.svelte-243972de.js", "css": [], "js": ["pages/skills.svelte-243972de.js", "chunks/vendor-96868851.js", "chunks/Container-934b6593.js"], "styles": [] }, "src/routes/about.svelte": { "entry": "pages/about.svelte-afd8ec7b.js", "css": [], "js": ["pages/about.svelte-afd8ec7b.js", "chunks/vendor-96868851.js", "chunks/Image-0ddfdca8.js", "chunks/Container-934b6593.js", "chunks/Button-bf526c8f.js", "chunks/Icon-5ffe7568.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender: prerender2
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender: prerender2 });
}
var app = "";
const Dots_horizontal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  let { iconColor = "" } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    escape_object(accessibilityProps),
    {
      fill: escape_attribute_value(iconColor || "currentColor")
    },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" }
  ])}><path d="${"M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"}"></path></svg>` : ``}

      <svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    escape_object(accessibilityProps),
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" }
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"}"></path></svg>`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "" } = $$props;
  let { iconColor = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    escape_object(accessibilityProps),
    { "data-prefix": "fas" },
    { "data-icon": "chevron-right" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 320 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"}"></path></svg>`;
});
const Dots_vertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "w-6 h-6" } = $$props;
  let { iconColor = "none" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    escape_object(accessibilityProps),
    { "data-prefix": "fas" },
    { "data-icon": "ellipsis-v" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 192 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"}"></path></svg>`;
});
const Instagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "w-6 h-6" } = $$props;
  let { iconColor = "currentColor" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    escape_object(accessibilityProps),
    { "data-prefix": "fab" },
    { "data-icon": "instagram-square" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 448 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"}"></path></svg>`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "w-6 h-6" } = $$props;
  let { iconColor = "none" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    { class: escape_attribute_value(classes) },
    { fill: escape_attribute_value(iconColor) },
    escape_object(accessibilityProps),
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" }
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}"></path></svg>`;
});
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formattedClassName = "" } = $$props;
  let { solid = false } = $$props;
  let { iconColor = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    {
      fill: escape_attribute_value(iconColor || "currentColor")
    },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path d="${"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"}"></path></svg>` : `<svg${add_attribute("class", `${formattedClassName}`, 0)} fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"}"></path></svg>`}`;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  let { iconColor = "" } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    escape_object(accessibilityProps),
    {
      fill: escape_attribute_value(iconColor || "currentColor")
    },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" }
  ])}><path fill-rule="${"evenodd"}" d="${"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"}" clip-rule="${"evenodd"}"></path></svg>` : ``}
    <svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    escape_object(accessibilityProps),
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" }
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"}"></path></svg>`;
});
const X = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    escape_object(accessibilityProps),
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" }
  ])}><path fill-rule="${"evenodd"}" d="${"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0\n              01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}"></path></svg>` : ``}
    <svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    escape_object(accessibilityProps),
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" }
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M6 18L18 6M6 6l12 12"}"></path></svg>`;
});
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  let { iconColor = "" } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    {
      fill: escape_attribute_value(iconColor || "currentColor")
    },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1\n        1 0 011.414 0z"}" clip-rule="${"evenodd"}"></path></svg>` : ``}
<svg${add_attribute("class", `${formattedClassName}`, 0)} fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"https://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"}"></path></svg>`;
});
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formattedClassName = "" } = $$props;
  let { solid = false } = $$props;
  let { iconColor = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    {
      fill: escape_attribute_value(iconColor || "currentColor")
    },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${add_attribute("class", `${formattedClassName}`, 0)} fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"}"></path></svg>`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg>`}`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"}"></path></svg>`}`;
});
const Academic_cap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path d="${"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path d="${"M12 14l9-5-9-5-9 5 9 5z"}"></path><path d="${"M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"}"></path><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"}"></path></svg>`}`;
});
const Location = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}"></path><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M15 11a3 3 0 11-6 0 3 3 0 016 0z"}"></path></svg>`}`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path d="${"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"}"></path></svg>`}`;
});
const Mail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path d="${"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}"></path><path d="${"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"}"></path></svg>` : ``}
<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"}"></path></svg>`;
});
const Desktop_computer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "https://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"}"></path></svg>`}`;
});
const Cube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"}"></path></svg>`}`;
});
const Terminal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"}"></path></svg>`}`;
});
const Briefcase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"}" clip-rule="${"evenodd"}"></path><path d="${"M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"}"></path></svg>`}`;
});
const Menu_alt1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solid = false } = $$props;
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `${solid ? `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 20 20" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path fill-rule="${"evenodd"}" d="${"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"}" clip-rule="${"evenodd"}"></path></svg>` : `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "none" },
    { stroke: "currentColor" },
    { viewBox: "0 0 24 24" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h8m-8 6h16"}"></path></svg>`}`;
});
function getSizeClassName(size) {
  switch (size) {
    case "mini":
      return `w-1 h-1`;
    case "tiny":
    case "xsmall":
      return `w-2 h-2`;
    case "small":
      return `w-4 h-4`;
    case "medium":
      return `w-6 h-6`;
    case "big":
    case "large":
      return `w-8 h-8`;
    case "huge":
    case "xlarge":
      return `w-12 h-12`;
    case "massive":
    case "2xlarge":
      return `w-16 h-16`;
    default:
      return size;
  }
}
function getColorClassName(color) {
  switch (color) {
    case "gray":
      return `text-gray-400`;
    case "dark-gray":
      return `text-gray-700`;
    case "white":
      return `text-white`;
    case "black":
      return `text-black dark:text-white`;
    case "pink":
      return `text-pink-500`;
    case "green":
      return `text-green-500`;
    case "red":
      return `text-red-500`;
    case "yellow":
      return `text-yellow-300`;
    case "orange":
      return `text-orange-500`;
    case "blue":
      return `text-blue-500`;
    case "teal":
      return `text-teal-500`;
    case "indigo":
      return `text-indigo-500`;
    case "purple":
      return `text-purple-500`;
    case "primary":
      return `text-dh-secondary-dark-500`;
    default:
      return color;
  }
}
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "" } = $$props;
  let { classes = "" } = $$props;
  let { accessibilityProps = void 0 } = $$props;
  let { color = "" } = $$props;
  let { solid = false } = $$props;
  let { size = "" } = $$props;
  if (!name) {
    name = null;
  }
  const c = getColorClassName(color);
  const s2 = getSizeClassName(size) || "";
  const cn = classes || "";
  const formattedClassName = `${c} ${s2} ${cn}`;
  const iconMap = {
    "cheveron-right": Chevron_right,
    instagram: Instagram,
    "dots-vertical": Dots_vertical,
    search: Search,
    "dots-horizontal": Dots_horizontal,
    moon: Moon,
    login: Login,
    sun: Sun,
    user: User,
    x: X,
    menu: Menu,
    "menu-alt1": Menu_alt1,
    calendar: Calendar,
    "academic-cap": Academic_cap,
    location: Location,
    home: Home,
    mail: Mail,
    "desktop-computer": Desktop_computer,
    cube: Cube,
    terminal: Terminal,
    briefcase: Briefcase
  };
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(iconMap[name] || null || missing_component, "svelte:component").$$render($$result, {
    formattedClassName,
    accessibilityProps,
    solid
  }, {}, {})}`;
});
function getLoaderColor(color) {
  switch (color) {
    case "white":
      return `loader-white`;
    case "gray":
      return `loader-gray`;
    case "pink":
      return `loader-pink`;
    case "green":
      return `loader-green`;
    case "red":
      return `loader-red`;
    case "yellow":
      return `loader-yellow`;
    case "purple":
      return `loader-purple`;
    case "teal":
      return `loader-teal`;
    case "indigo":
      return `loader-indigo`;
    case "blue":
      return `loader-blue`;
    case "orange":
      return `loader-orange`;
    case "black":
    default:
      return "loader-black";
  }
}
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "" } = $$props;
  let { message = "" } = $$props;
  let { isButton } = $$props;
  let { className = "" } = $$props;
  let { messageClassName = "" } = $$props;
  const c = getLoaderColor(color);
  const b = isButton ? `border-2 border-t-2` : `border-8 border-t-8`;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.isButton === void 0 && $$bindings.isButton && isButton !== void 0)
    $$bindings.isButton(isButton);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.messageClassName === void 0 && $$bindings.messageClassName && messageClassName !== void 0)
    $$bindings.messageClassName(messageClassName);
  return `<div class="${"flex flex-col justify-center items-center"}"><div${add_attribute("class", `${c} ${b} animate-spin rounded-full ${className || ""}`, 0)}></div>
    ${message ? `<div${add_attribute("class", `${messageClassName || ""}`, 0)}>${escape(message)}</div>` : ``}
    ${slots.default ? slots.default({}) : ``}</div>`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "" } = $$props;
  let { type = "" } = $$props;
  let { color = "" } = $$props;
  let { text = "" } = $$props;
  let { icon = {
    position: "",
    name: "",
    size: "",
    className: "",
    color: "",
    solid: false
  } } = $$props;
  let { onClick = () => {
  } } = $$props;
  let { accessibilityProps = {} } = $$props;
  let { loading = false } = $$props;
  let { loadingClassName = "" } = $$props;
  let { href = "" } = $$props;
  let { target = "" } = $$props;
  let { disabled = false } = $$props;
  let { size = "" } = $$props;
  const iconStyle = icon ? "flex" : "";
  const btnType = type === "submit" ? "submit" : "button";
  let btnSize;
  let fontSize;
  let btnBgColor;
  let btnBgColorHover;
  let btnTextColor = "text-black";
  switch (color) {
    case "primary":
      btnBgColor = `bg-dh-secondary-dark-500 dark:bg-white`;
      btnBgColorHover = `hover:bg-dh-secondary-dark-400 dark:hover:bg-gray-100`;
      btnTextColor = `text-white dark:text-dh-primary-dark-500 `;
      break;
    case "secondary":
      btnBgColor = `bg-dh-primary-dark-500 dark:bg-dh-secondary-dark-500`;
      btnBgColorHover = `hover:bg-gray-700 dark:hover:bg-dh-secondary-dark-400`;
      btnTextColor = `text-white dark:text-dh-primary-dark-500`;
      break;
    case "gray":
      btnBgColor = `bg-gray-300`;
      btnBgColorHover = `hover:bg-gray-400`;
      btnTextColor = `text-black`;
      break;
    case "white":
      btnBgColor = `bg-white`;
      btnBgColorHover = `hover:bg-gray-200`;
      btnTextColor = `text-sgPrimaryLight-500`;
      break;
    case "black":
      btnBgColor = `bg-dh-primary-dark-500`;
      btnBgColorHover = `hover:bg-gray-900`;
      break;
    case "pink":
      btnBgColor = `bg-pink-500`;
      btnBgColorHover = `hover:bg-pink-600`;
      break;
    case "green":
      btnBgColor = `bg-green-500 dark:bg-pink-500`;
      btnBgColorHover = `hover:bg-green-600`;
      break;
    case "red":
      btnBgColor = `bg-red-500`;
      btnBgColorHover = `hover:bg-red-600`;
      break;
    case "yellow":
      btnBgColor = `bg-yellow-500`;
      btnBgColorHover = `hover:bg-yellow-600`;
      break;
    case "orange":
      btnBgColor = `bg-orange-500`;
      btnBgColorHover = `hover:bg-orange-600`;
      break;
    case "blue":
      btnBgColor = `bg-blue-500`;
      btnBgColorHover = `hover:bg-blue-600`;
      break;
    case "teal":
      btnBgColor = `bg-teal-400`;
      btnBgColorHover = `hover:bg-teal-500`;
      break;
    case "indigo":
      btnBgColor = `bg-indigo-500`;
      btnBgColorHover = `hover:bg-indigo-600`;
      break;
    case "purple":
      btnBgColor = `bg-purple-500`;
      btnBgColorHover = `hover:bg-purple-600`;
      break;
    default:
      btnBgColor = ``;
      btnBgColorHover = ``;
      btnTextColor = ``;
  }
  switch (size) {
    case "mini":
      btnSize = "p-2";
      fontSize = "text-xs";
      break;
    case "tiny":
      btnSize = "p-2";
      fontSize = "text-sm";
      break;
    case "small":
      btnSize = "p-2";
      fontSize = "text-base";
      break;
    case "medium":
      btnSize = "p-2";
      fontSize = "text-lg";
      break;
    case "large":
      btnSize = "p-2";
      fontSize = "text-xl";
      break;
    case "big":
      btnSize = "p-2";
      fontSize = "text-2xl";
      break;
    case "huge":
      btnSize = "p-2";
      fontSize = "text-3xl";
      break;
    case "massive":
      btnSize = "p-2";
      fontSize = "text-4xl";
      break;
    default:
      btnSize = ``;
      fontSize = ``;
  }
  const disabledClass = disabled ? `opacity-50 cursor-not-allowed` : "";
  const formattedClassName = classes || "";
  const combinedClassNames = `${iconStyle} ${btnSize} ${fontSize} ${btnBgColor} ${!disabled && btnBgColorHover} ${btnTextColor} ${formattedClassName} ${disabledClass}`;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.loadingClassName === void 0 && $$bindings.loadingClassName && loadingClassName !== void 0)
    $$bindings.loadingClassName(loadingClassName);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<button${spread([
    { type: escape_attribute_value(btnType) },
    {
      class: escape_attribute_value(`${combinedClassNames} focus:ring bg-center items-center cursor-pointer shadow-xs rounded-full`)
    },
    escape_object(accessibilityProps)
  ])}>${icon && !loading && icon.position === "left" ? `${validate_component(Icon, "Icon").$$render($$result, {
    name: icon.name,
    color: icon.color,
    solid: icon.solid,
    size: icon.size,
    classes: `${icon.className || ""} mr-2`
  }, {}, {})}` : ``}
	

	${!loading ? `${text ? `<span>${escape(text)}</span>` : `${slots.default ? slots.default({}) : ``}`}` : ``}
	
	${loading ? `${validate_component(Loading, "Loading").$$render($$result, {
    className: loadingClassName || "h-4 w-4",
    isButton: true
  }, {}, {})}` : ``}

	${icon && !loading && icon.position === "right" ? `${validate_component(Icon, "Icon").$$render($$result, {
    name: icon.name,
    color: icon.color,
    solid: icon.solid,
    size: icon.size,
    classes: `${icon.className || ""} ml-2`
  }, {}, {})}` : ``}</button>`;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let display;
  let visibility;
  let opacity;
  let height;
  let { className = "" } = $$props;
  let { dropClassName = "" } = $$props;
  let { text = "" } = $$props;
  let { trigger = [] } = $$props;
  let { id = "" } = $$props;
  let { button = void 0 } = $$props;
  let { icon = {} } = $$props;
  let isOpen = false;
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  let iconProps;
  if (icon) {
    iconProps = { ...icon };
    iconProps.className = `transition duration-200 transform ${isOpen && iconProps.rotate ? "rotate-90" : ""}`;
  }
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.dropClassName === void 0 && $$bindings.dropClassName && dropClassName !== void 0)
    $$bindings.dropClassName(dropClassName);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
    $$bindings.trigger(trigger);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  display = isOpen ? "block" : "hidden";
  visibility = isOpen ? "visibile" : "invisibile";
  opacity = isOpen ? "opacity-100" : "opacity-0";
  height = isOpen ? "h-auto" : "0";
  return `<div${add_attribute("id", id, 0)}${add_attribute("class", `relative inline-block top-0 bg-transparent border-none ${className || ""}`, 0)}>
    
    ${button ? `${validate_component(Button, "Button").$$render($$result, {
    type: "button",
    text: button.text,
    color: button.color,
    icon: iconProps,
    classes: button.className,
    loading: button.loading,
    onClick: () => toggleDropdown()
  }, {}, {})}` : ``}
    ${trigger ? `<div class="${"flex items-center cursor-pointer"}">${validate_component(trigger[0].component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        </div>` : ``}
    <p class="${"cursor-pointer"}">${escape(text)}</p>
    <div${add_attribute("class", `z-30 transition duration-200 overflow-hidden absolute right-0 shadow-xs ${visibility} ${opacity} ${height} ${display} ${dropClassName || ""}`, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const MoreDropdownTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Button, "Button").$$render($$result, {
    classes: "p-1 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-none rounded"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      name: "dots-horizontal",
      color: "black",
      size: "medium"
    }, {}, {})}`
  })}`;
});
const MoreDropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { desktop } = $$props;
  const children = [{ component: MoreDropdownTrigger }];
  if ($$props.desktop === void 0 && $$bindings.desktop && desktop !== void 0)
    $$bindings.desktop(desktop);
  return `<div class="${"flex items-center"}">${validate_component(Dropdown, "Dropdown").$$render($$result, {
    id: "desktop-user-menu",
    trigger: children,
    className: "px-4",
    dropClassName: "w-48 bg-white text-dh-primary-dark-500 dark:text-white dark:bg-gray-900 rounded shadow-lg"
  }, {}, {
    default: () => `<ul class="${"pb-4"}"><li class="${"pt-4 pb-2"}"><div class="${"font-bold uppercase text-sm ml-4"}">${escape(desktop.primary.label)}</div></li>
            
            ${each(desktop.primary.items, (item) => `<li class="${""}"><div class="${"mx-4"}">${validate_component(Button, "Button").$$render($$result, {
      classes: "flex w-full justify-start px-4 py-1 cursor-pointer text-sm hover:bg-gray-200 dark:hover:bg-gray-600 rounded shadow-none",
      href: item["href"],
      text: item["label"]
    }, {}, {})}</div>
              </li>`)}</ul>`
  })}</div>`;
});
const nav = {
  mobile: {
    primary: {
      label: "Navigation",
      items: [
        {
          label: "Home",
          icon: "home",
          href: "/",
          id: v4$1()
        },
        {
          label: "Projects",
          icon: "desktop-computer",
          href: "/projects",
          id: v4$1()
        },
        {
          label: "Contact",
          icon: "mail",
          href: "/contact",
          id: v4$1()
        },
        {
          label: "Experience",
          icon: "briefcase",
          href: "/experience",
          id: v4$1()
        },
        {
          label: "Technical Skills",
          icon: "terminal",
          href: "/skills",
          id: v4$1()
        },
        {
          label: "Blockchain",
          icon: "cube",
          href: "/blockchain",
          id: v4$1()
        }
      ]
    }
  },
  desktop: {
    primary: {
      label: "More",
      items: [
        {
          label: "About Me",
          href: "/about",
          id: v4$1()
        },
        {
          label: "Experience",
          href: "/experience",
          id: v4$1()
        },
        {
          label: "Technical Skills",
          href: "/skills",
          id: v4$1()
        },
        {
          label: "Blockchain",
          href: "/blockchain",
          id: v4$1()
        }
      ]
    },
    authenticated: {
      items: [
        {
          label: "Messages",
          icon: "mail",
          href: "/messages",
          id: v4$1()
        }
      ]
    },
    secondaryLoggedOut: {
      label: "",
      items: [
        {
          label: "Darkmode",
          icon: "moon",
          href: "/",
          id: v4$1()
        }
      ]
    }
  }
};
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
const isDarkMode = writable(false);
const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
const theme = writable(storedTheme);
if (typeof window !== "undefined") {
  theme.subscribe((value) => {
    localStorage.setItem("theme", value === "dark" ? "dark" : "light");
  });
}
const ToggleThemeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let iconName;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  iconName = $theme === "dark" ? "sun" : "moon";
  $$unsubscribe_theme();
  return `<button class="${"flex w-full justify-end items-center"}">${validate_component(Icon, "Icon").$$render($$result, {
    name: iconName,
    color: "black",
    classes: "w-6 h-6 hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500",
    solid: true
  }, {}, {})}</button>`;
});
const DavidHanlonLogo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 281 27" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><g id="${"A"}" transform="${"translate(-154.000000, -242.000000)"}" fill="${"currentColor"}" fill-rule="${"nonzero"}"><g id="${"Group"}" transform="${"translate(154.000000, 171.000000)"}"><g transform="${"translate(0.000000, 71.000000)"}" id="${"Shape"}"><path d="${"M11.1,0.6 C19.1,0.6 24.7,5.8 24.7,13.4 C24.7,20.9 19.1,26.2 10.9,26.2 L0.2,26.2 L0.2,0.7 L11.1,0.7 L11.1,0.6 Z M6.6,21 L11.2,21 C15.2,21 18,17.9 18,13.5 C18,9 15,5.9 10.9,5.9 L6.6,5.9 L6.6,21 Z"}"></path><path d="${"M34.1,21.5 L32.2,26.2 L25.5,26.2 L36.5,0.7 L43.2,0.7 L54,26.2 L47,26.2 L45.2,21.5 L34.1,21.5 Z M39.7,7.1 L36,16.5 L43.4,16.5 L39.7,7.1 Z"}"></path><polygon points="${"63.7 26.2 53.8 0.7 60.7 0.7 67.2 19.5 73.7 0.7 80.4 0.7 70.4 26.2"}"></polygon><polygon points="${"82.5 26.2 82.5 0.7 89 0.7 89 26.2"}"></polygon><path d="${"M105.3,0.6 C113.3,0.6 118.9,5.8 118.9,13.4 C118.9,20.9 113.3,26.2 105.1,26.2 L94.4,26.2 L94.4,0.7 L105.3,0.7 L105.3,0.6 Z M100.8,21 L105.4,21 C109.4,21 112.2,17.9 112.2,13.5 C112.2,9 109.2,5.9 105.1,5.9 L100.8,5.9 L100.8,21 Z"}"></path><polygon points="${"145.4 26.2 145.4 15 130 15 130 26.2 127.1 26.2 127.1 0.7 130 0.7 130 12.2 145.4 12.2 145.4 0.7 148.3 0.7 148.3 26.2"}"></polygon><path d="${"M158.4,19.7 L155.6,26.2 L152.5,26.2 L164,0.7 L167,0.7 L178.4,26.2 L175.2,26.2 L172.4,19.7 L158.4,19.7 Z M165.4,3.9 L159.7,16.8 L171.2,16.8 L165.4,3.9 Z"}"></path><polygon points="${"200.6 26.2 185.3 5.7 185.3 26.2 182.4 26.2 182.4 0.7 185.4 0.7 200.7 21.2 200.7 0.7 203.6 0.7 203.6 26.2"}"></polygon><polygon points="${"225.1 23.4 225.1 26.2 211 26.2 211 0.7 213.9 0.7 213.9 23.5 225.1 23.5"}"></polygon><path d="${"M254.4,13.4 C254.4,20.6 248.5,26.3 241.1,26.3 C233.6,26.3 227.7,20.6 227.7,13.4 C227.7,6.2 233.6,0.6 241.1,0.6 C248.5,0.6 254.4,6.2 254.4,13.4 Z M230.6,13.4 C230.6,19 235.3,23.5 241,23.5 C246.7,23.5 251.4,19 251.4,13.4 C251.4,7.8 246.7,3.3 241,3.3 C235.3,3.3 230.6,7.8 230.6,13.4 Z"}"></path><polygon points="${"277.6 26.2 262.3 5.7 262.3 26.2 259.4 26.2 259.4 0.7 262.4 0.7 277.7 21.2 277.7 0.7 280.6 0.7 280.6 26.2"}"></polygon></g></g></g></svg>`;
});
const MainNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { desktop } = nav;
  const formattedClassName = $$props.className;
  return `
    <nav${add_attribute("class", `${formattedClassName} hidden md:h-16 md:flex md:content-end z-50 md:top-0 md:fixed md:w-full`, 0)}><div class="${"flex w-full"}"><div class="${"flex w-full"}"><div class="${"hover:bg-gray-200 dark:hover:bg-gray-800 flex justify-center"}">${validate_component(Button, "Button").$$render($$result, {
    href: "/",
    classes: "shadow-none p-4 ",
    accessibilityProps: {
      "aria-label": "David Hanlon - Click to navigate to home page"
    }
  }, {}, {
    default: () => `${validate_component(DavidHanlonLogo, "Logo").$$render($$result, {
      formattedClassName: "w-36 h-36 text-dh-secondary-dark-500 dark:text-dh-secondary-dark-500 hover:text-black dark:hover:text-white"
    }, {}, {})}`
  })}</div>
          <div class="${"my-auto px-2 md-991:ml-8 lg:ml-8 xl:ml-12"}">${validate_component(Button, "Button").$$render($$result, {
    classes: "md:text-sm md-991:text-md lg:text-lg font-bold text-black dark:text-white hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500 shadow-none",
    href: "/projects",
    type: "button",
    text: "Projects"
  }, {}, {})}</div>
          <div class="${"my-auto px-2 md-991:ml-8 lg:ml-8 xl:ml-12"}">${validate_component(Button, "Button").$$render($$result, {
    classes: "md:text-sm md-991:text-md lg:text-lg font-bold text-black dark:text-white hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500 shadow-none",
    href: "/contact",
    type: "button",
    text: "Contact"
  }, {}, {})}</div>
          ${validate_component(MoreDropdown, "MoreDropdown").$$render($$result, { desktop }, {}, {})}</div>
        <div class="${"flex mx-4"}">${validate_component(ToggleThemeButton, "ToggleThemeButton").$$render($$result, {}, {}, {})}</div></div></nav>`;
});
const DesktopNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const formattedClassName = $$props.className;
  return `${validate_component(MainNav, "MainNav").$$render($$result, Object.assign({ className: `${formattedClassName}` }, $$props), {}, {})}`;
});
const DhLogo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName}`)
    },
    { fill: "currentColor" },
    { viewBox: "0 0 129 62" },
    { xmlns: "http://www.w3.org/2000/svg" },
    escape_object(accessibilityProps)
  ])}><g id="${"A"}" transform="${"translate(-222.000000, -171.000000)"}" fill="${"currentColor"}" fill-rule="${"nonzero"}"><g id="${"Group"}" transform="${"translate(154.000000, 171.000000)"}"><path d="${"M191.3,19.4 L191.3,7.8 C191.3,3.5 187.9,0.2 183.2,0.2 L168.7,2.84217094e-14 C165.6,2.84217094e-14 163.1,2.5 163.1,5.6 L163.1,25 L136.7,25 L136.7,0 L129,0 L129,25.2 C127.9,19 124.9,13.3 120.6,9.1 C115.1,3.6 107.5,0.2 99.1,0.2 L95,0.2 L95,43.8 L99.6,43.8 C101.3,43.8 102.7,42.4 102.7,40.7 L102.7,8.3 C107.4,9.1 111.6,11.4 114.9,14.6 C119,18.7 121.5,24.4 121.5,30.7 C121.5,37 119,42.6 114.9,46.8 C110.8,50.9 105.1,53.4 98.8,53.4 L87.9,53.4 C85.7,53.4 83.7,52.1 82.9,50.1 C82.7,49.6 82.6,49.2 82.6,48.7 L82.6,36.7 C82.6,33 79.2,31.4 77.4,31 L76.4,30.7 C76.5,30.7 76.8,30.6 77.3,30.6 C79.1,30.3 82.6,28.9 82.6,24.7 L82.6,12.2 C82.6,9.4 83.5,7.5 86.7,7.5 L91.3,7.5 L91.3,0.3 L81.2,0.3 C76.5,0.3 73.1,3.6 73.1,7.9 L73.1,19.5 C73.1,24 71.7,26.1 68.2,26.9 L68.2,34.6 C73,35.6 73.1,39.3 73.1,43.4 L73.1,53.1 C73.1,57.4 75.9,61.3 80.6,61.3 L98.7,61.2 C107.1,61.2 114.7,57.8 120.2,52.3 C124.5,48 127.5,42.4 128.6,36.2 L128.6,62 L136.3,62 L136.3,33 L163,33 L163,62 L172,62 L172,11 C172,9.1 173.5,7.6 175.4,7.6 L177.6,7.6 C180.8,7.6 181.7,9.5 181.7,12.3 L181.7,24.8 C181.7,29 185.2,30.4 187,30.7 C187.6,30.8 187.9,30.8 187.9,30.8 L186.9,31.1 C185.1,31.5 181.7,33.2 181.7,36.8 L181.7,48.8 C181.7,51.6 181,54.2 177.6,54.2 L175.5,54.2 L175.5,61.4 L183.7,61.4 C188.4,61.4 191.2,57.6 191.2,53.2 L191.2,43.5 C191.2,39.4 191.3,35.8 196.1,34.7 L196.1,27 C192.8,26.1 191.3,24 191.3,19.4"}" id="${"Shape"}"></path></g></g></svg>`;
});
const PrimarySideMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { activeSideMenu = false } = $$props;
  let { mobile = {
    primary: {
      label: "",
      items: [{ label: "", icon: "", href: "", id: "" }]
    }
  } } = $$props;
  let { handleClick = void 0 } = $$props;
  if ($$props.activeSideMenu === void 0 && $$bindings.activeSideMenu && activeSideMenu !== void 0)
    $$bindings.activeSideMenu(activeSideMenu);
  if ($$props.mobile === void 0 && $$bindings.mobile && mobile !== void 0)
    $$bindings.mobile(mobile);
  if ($$props.handleClick === void 0 && $$bindings.handleClick && handleClick !== void 0)
    $$bindings.handleClick(handleClick);
  return `
${!activeSideMenu ? `
    <div class="${"flex items-center px-2 mx-auto border-b border-gray-300 dark:border-gray-600 py-2 mb-6"}">${validate_component(Button, "Button").$$render($$result, { href: "/", classes: "shadow-none p-4" }, {}, {
    default: () => `${validate_component(DhLogo, "Logo").$$render($$result, {
      formattedClassName: "w-10 h-10 text-dh-secondary-dark-500"
    }, {}, {})}`
  })}</div>
    
    <ul class="${"mb-10"}"><li><p class="${"text-xs uppercase pb-2 font-bold pl-6 text-black dark:text-white"}">Navigation</p></li>
      
      ${each(mobile.primary.items, (item) => `<li>${validate_component(Button, "Button").$$render($$result, {
    onClick: () => handleClick(item),
    href: item && item.href ? item.href : "",
    classes: "flex w-9/10 mx-4 my-2 items-center cursor-pointer py-1 px-6 shadow-none rounded hover:bg-gray-700"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      name: item.icon,
      classes: "h-8 w-8 mr-3",
      color: "primary"
    }, {}, {})}
            <p class="${"text-lg text-gray-500 dark:text-gray-200"}">${escape(item.label)}</p>
            ${item && mobile.primary.items.length > 0 ? `${validate_component(Icon, "Icon").$$render($$result, {
      name: "chevron-right",
      classes: "h-5 w-5 ml-auto text-gray-500 dark:text-gray-200"
    }, {}, {})}` : ``}
          `
  })}
        </li>`)}</ul>` : ``}`;
});
const Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formattedClassName = "" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `
<svg${spread([
    {
      class: escape_attribute_value(`${formattedClassName || "w-6 h-6"}`)
    },
    escape_object(accessibilityProps),
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 448 512" },
    { "data-fa-i2svg": "" }
  ])}><path fill="${"currentColor"}" d="${"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"}"></path></svg>`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { formattedClassName = "" } = $$props;
  if ($$props.formattedClassName === void 0 && $$bindings.formattedClassName && formattedClassName !== void 0)
    $$bindings.formattedClassName(formattedClassName);
  return `<svg${add_attribute("class", `${formattedClassName}`, 0)} role="${"img"}" fill="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"https://www.w3.org/2000/svg"}"><title>GitHub icon</title><path d="${"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}"></path></svg>`;
});
const Insta = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "w-6 h-6" } = $$props;
  let { iconColor = "currentColor" } = $$props;
  let { accessibilityProps = {
    "role": "none",
    "aria-hidden": true,
    "focusable": "false"
  } } = $$props;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.iconColor === void 0 && $$bindings.iconColor && iconColor !== void 0)
    $$bindings.iconColor(iconColor);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  return `<svg${spread([
    { class: escape_attribute_value(classes) },
    { xmlns: "https://www.w3.org/2000/svg" },
    { viewBox: "0 0 24 24" },
    escape_object(accessibilityProps)
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"}"></path></svg>`;
});
const SocialIcons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = "" } = $$props;
  let { colorPallete = "" } = $$props;
  let buttonClasses = `mx-2 p-2 rounded-full border-2 `;
  if (colorPallete === "mobileMenu") {
    buttonClasses += `bg-white hover:bg-dh-secondary-dark-500 border-black text-black hover:text-white
    dark:bg-dh-primary-dark-500 dark:hover:bg-dh-secondary-dark-500 dark:border-white dark:text-white dark:hover:text-black`;
  } else {
    buttonClasses += `bg-dh-secondary-dark-500 hover:bg-white border-white text-white hover:text-dh-secondary-dark-500
    dark:bg-dh-secondary-dark-500 dark:hover:bg-dh-primary-dark-500 dark:border-black dark:text-black dark:hover:text-dh-secondary-dark-500`;
  }
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.colorPallete === void 0 && $$bindings.colorPallete && colorPallete !== void 0)
    $$bindings.colorPallete(colorPallete);
  return `<div${add_attribute("class", `flex ${classes}`, 0)}><a href="${"https://linkedin.com/in/david-hanlon"}" target="${"_blank"}" aria-label="${"link to my linkedin profile in new tab"}"${add_attribute("class", buttonClasses, 0)}>${validate_component(Linkedin, "Linkedin").$$render($$result, { formattedClassName: "w-4 h-4" }, {}, {})}</a>
    <a href="${"https://github.com/davidhanlon23"}" target="${"_blank"}" aria-label="${"link to my github in new tab"}"${add_attribute("class", buttonClasses, 0)}>${validate_component(Github, "Github").$$render($$result, { formattedClassName: "w-4 h-4" }, {}, {})}</a>
    
    <a href="${"https://instagram.com/davidmhanlon"}" target="${"_blank"}" aria-label="${"link to my instagram in new tab"}"${add_attribute("class", buttonClasses, 0)}>${validate_component(Insta, "Insta").$$render($$result, { classes: "w-4 h-4" }, {}, {})}</a>
    <a href="${"mailto:davidhanlon23@gmail.com"}" aria-label="${"click to send me an email"}"${add_attribute("class", buttonClasses, 0)}>${validate_component(Mail, "Mail").$$render($$result, { formattedClassName: "w-4 h-4" }, {}, {})}</a></div>`;
});
const MobileMenuFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"bg-white dark:bg-dh-primary-dark-500 w-full flex items-center justify-between absolute bottom-0 border-gray-300 pl-6 pr-4 py-2 border-t"}">${validate_component(SocialIcons, "SocialIcons").$$render($$result, { colorPallete: "mobileMenu" }, {}, {})}</div>`;
});
const MobileSideMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggleMobileSideMenu = void 0 } = $$props;
  let { mobileSideMenu = false } = $$props;
  const { mobile } = nav;
  let activeSideMenu = false;
  function setActiveSideMenu(activeStatus) {
    activeSideMenu = activeStatus;
  }
  function getMenuItem(itemName) {
    if (!itemName) {
      setActiveSideMenu(false);
      return;
    }
    const secondarySideMenu = mobile.primary.items.find((item) => {
      return item.label === itemName;
    });
    setActiveSideMenu(secondarySideMenu);
  }
  function handleClick(item) {
    if (item.children && item.children.length) {
      getMenuItem(item.label);
    } else {
      toggleMobileSideMenu(false);
    }
  }
  if ($$props.toggleMobileSideMenu === void 0 && $$bindings.toggleMobileSideMenu && toggleMobileSideMenu !== void 0)
    $$bindings.toggleMobileSideMenu(toggleMobileSideMenu);
  if ($$props.mobileSideMenu === void 0 && $$bindings.mobileSideMenu && mobileSideMenu !== void 0)
    $$bindings.mobileSideMenu(mobileSideMenu);
  return `<div${add_attribute("class", `fixed z-220 top-0 left-0 w-full h-full lg:hidden transition-all ease-in duration-400 ${mobileSideMenu ? "visible" : "invisible"}`, 0)}><div id="${"sidebar-overlay"}" class="${"z-210 bg-dh-primary-dark-500 opacity-50 w-full h-full"}"></div>
    <div${add_attribute("class", `overflow-hidden absolute top-0 left-0 z-220 bg-white dark:bg-dh-primary-dark-500 w-4/5 h-full transition-all ease-in-out duration-500 ${mobileSideMenu ? "ml-0" : "-ml-152"}`, 0)}><div class="${"second-container pb-10 h-full overflow-y-scroll"}" width="${"103%"}">${validate_component(PrimarySideMenu, "PrimarySideMenu").$$render($$result, { activeSideMenu, mobile, handleClick }, {}, {})}
        
        ${validate_component(MobileMenuFooter, "MobileMenuFooter").$$render($$result, {}, {}, {})}</div></div></div>`;
});
const MobileMenuButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Button, "Button").$$render($$result, {
    onClick: () => {
      $$props.onClick();
    },
    classes: "shadow-none"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      name: "menu-alt1",
      size: "large",
      classes: "text-black dark:text-white"
    }, {}, {})}`
  })}`;
});
const MobileHeaderItems = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggleMobileSideMenu = void 0 } = $$props;
  let { mobileSideMenu = false } = $$props;
  if ($$props.toggleMobileSideMenu === void 0 && $$bindings.toggleMobileSideMenu && toggleMobileSideMenu !== void 0)
    $$bindings.toggleMobileSideMenu(toggleMobileSideMenu);
  if ($$props.mobileSideMenu === void 0 && $$bindings.mobileSideMenu && mobileSideMenu !== void 0)
    $$bindings.mobileSideMenu(mobileSideMenu);
  return `<div>${validate_component(MobileMenuButton, "MobileMenuButton").$$render($$result, {
    className: "h-8 w-8 cursor-pointer stroke-current text-gray-600 hover:text-black",
    onClick: () => toggleMobileSideMenu(!mobileSideMenu)
  }, {}, {})}</div>
        <div class="${"px-2 mx-auto"}">${validate_component(Button, "Button").$$render($$result, {
    href: "/",
    classes: "shadow-none p-4",
    accessibilityProps: {
      "aria-label": "DH - Click to return to home page"
    }
  }, {}, {
    default: () => `${validate_component(DhLogo, "Logo").$$render($$result, {
      formattedClassName: "w-10 h-10 text-dh-secondary-dark-500"
    }, {}, {})}`
  })}</div>
        <div>${validate_component(ToggleThemeButton, "ToggleThemeButton").$$render($$result, {}, {}, {})}</div>`;
});
const MobileNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mobileSideMenu = false;
  function toggleMobileSideMenu(activeStatus) {
    mobileSideMenu = activeStatus;
  }
  return `<div${add_attribute("class", `${$$props.className} w-full block fixed md:hidden z-50`, 0)}><div class="${"border-b h-16 border-gray-200 dark:border-gray-700"}"><div${add_attribute("class", `flex items-center px-4`, 0)}>${validate_component(MobileHeaderItems, "MobileHeaderItems").$$render($$result, { toggleMobileSideMenu, mobileSideMenu }, {}, {})}</div></div>
      ${validate_component(MobileSideMenu, "MobileSideMenu").$$render($$result, { mobileSideMenu, toggleMobileSideMenu }, {}, {})}</div>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(DesktopNav, "DesktopNav").$$render($$result, Object.assign($$props), {}, {})}
${validate_component(MobileNav, "MobileNav").$$render($$result, Object.assign($$props), {}, {})}`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="${"bg-dh-secondary-dark-500 dark:bg-dh-secondary-dark-500 py-4 px-20 text-center"}"><div class="${"flex justify-center m-8"}"><p class="${"text-2xl text-white dark:text-black"}">Living, learning, &amp; leveling 
			<br>
			 up one day at a time.</p></div>
	${validate_component(SocialIcons, "SocialIcons").$$render($$result, { classes: "justify-center mb-8" }, {}, {})}
	<div class="${"m-8 text-center"}"><p class="${"text-white dark:text-black"}">Hand crafted by me \xA9 DMH Global LLC</p>
		<p class="${"text-xs text-white dark:text-black"}">This project was built using SvelteJS</p></div></footer>`;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDarkMode2;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  isDarkMode2 = $theme === "dark" ? true : false;
  $$unsubscribe_theme();
  return `<main${add_attribute("class", `min-h-screen ${isDarkMode2 ? "dark" : ""}`, 0)}>${validate_component(Navbar, "Navbar").$$render($$result, {
    className: "bg-dh-primary-500 dark:bg-dh-primary-dark-500"
  }, {}, {})}
	<div class="${"min-h-screen bg-dh-primary-500 dark:bg-dh-primary-dark-500"}">${slots.default ? slots.default({}) : ``}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { defaultStyles = "" } = $$props;
  let { circle = false } = $$props;
  let { alt = "" } = $$props;
  let { classes = "" } = $$props;
  let { src = "" } = $$props;
  let { style = "" } = $$props;
  createEventDispatcher();
  defaultStyles = circle ? "rounded-full border-2 p-1" : "";
  if ($$props.defaultStyles === void 0 && $$bindings.defaultStyles && defaultStyles !== void 0)
    $$bindings.defaultStyles(defaultStyles);
  if ($$props.circle === void 0 && $$bindings.circle && circle !== void 0)
    $$bindings.circle(circle);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  return `<img${add_attribute("src", src, 0)}${add_attribute("class", `inline-block max-w-full ${defaultStyles} m-auto ${classes}`, 0)}${add_attribute("style", style, 0)}${add_attribute("alt", alt, 0)}>`;
});
function getDivHeight(height) {
  switch (height) {
    case "screen":
      height = `h-screen`;
      break;
    case "100":
      height = `h-full`;
      break;
    case "80":
      height = `h-4/5	`;
      break;
    case "75":
      height = `h-3/4`;
      break;
    case "50":
      height = `h-1/2`;
      break;
    default:
      height = `h-auto`;
  }
  return height;
}
const HeroBackground = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { backgroundImage = "" } = $$props;
  let { backgroundColor = "" } = $$props;
  let { imageDescription = "" } = $$props;
  let { overlayColor = "" } = $$props;
  let { overlayOpacity = "" } = $$props;
  let { backgroundHeight = "" } = $$props;
  const bgColor = backgroundColor || "bg-dh-primary-500";
  backgroundHeight = getDivHeight(backgroundHeight);
  if ($$props.backgroundImage === void 0 && $$bindings.backgroundImage && backgroundImage !== void 0)
    $$bindings.backgroundImage(backgroundImage);
  if ($$props.backgroundColor === void 0 && $$bindings.backgroundColor && backgroundColor !== void 0)
    $$bindings.backgroundColor(backgroundColor);
  if ($$props.imageDescription === void 0 && $$bindings.imageDescription && imageDescription !== void 0)
    $$bindings.imageDescription(imageDescription);
  if ($$props.overlayColor === void 0 && $$bindings.overlayColor && overlayColor !== void 0)
    $$bindings.overlayColor(overlayColor);
  if ($$props.overlayOpacity === void 0 && $$bindings.overlayOpacity && overlayOpacity !== void 0)
    $$bindings.overlayOpacity(overlayOpacity);
  if ($$props.backgroundHeight === void 0 && $$bindings.backgroundHeight && backgroundHeight !== void 0)
    $$bindings.backgroundHeight(backgroundHeight);
  return `${backgroundImage ? `${validate_component(Image, "Image").$$render($$result, {
    classes: `${backgroundHeight} w-full object-cover bg-center`,
    src: backgroundImage,
    alt: imageDescription
  }, {}, {})}
    <div${add_attribute("class", `absolute inset-0 ${overlayColor} ${overlayOpacity}`, 0)}></div>` : `<div${add_attribute("class", `${bgColor} ${backgroundHeight} w-full object-cover`, 0)}></div>`}`;
});
const HeroHeaders = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heroPrimaryHeader = "" } = $$props;
  let { heroSecondaryHeader = "" } = $$props;
  if ($$props.heroPrimaryHeader === void 0 && $$bindings.heroPrimaryHeader && heroPrimaryHeader !== void 0)
    $$bindings.heroPrimaryHeader(heroPrimaryHeader);
  if ($$props.heroSecondaryHeader === void 0 && $$bindings.heroSecondaryHeader && heroSecondaryHeader !== void 0)
    $$bindings.heroSecondaryHeader(heroSecondaryHeader);
  return `<div class="${"text-center font-extrabold tracking-tight pt-16 md:pt-0 sm:text-5xl text-4xl lg:text-4xl"}"><span class="${"block text-dh-secondary-dark-500 dark:text-dh-secondary-dark-500"}">${escape(heroPrimaryHeader)}</span>
    <span class="${"block text-dh-secondary-dark-500 dark:text-white"}">${escape(heroSecondaryHeader)}</span></div>`;
});
const HeroSubText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heroSubText = "" } = $$props;
  if ($$props.heroSubText === void 0 && $$bindings.heroSubText && heroSubText !== void 0)
    $$bindings.heroSubText(heroSubText);
  return `<div class="${"mt-6 max-w-lg mx-auto text-center text-xl text-black dark:text-white sm:max-w-3xl"}">${escape(heroSubText)}</div>`;
});
const HeroCTAs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heroObject } = $$props;
  const primaryStyles = heroObject.cta && heroObject.cta.secondary ? "sm:grid-cols-2" : "sm:grid-cols-1";
  if ($$props.heroObject === void 0 && $$bindings.heroObject && heroObject !== void 0)
    $$bindings.heroObject(heroObject);
  return `<div class="${"mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center"}"><div${add_attribute("class", `space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:gap-5 ${primaryStyles}`, 0)}>${heroObject.cta && heroObject.cta.primary ? `${validate_component(Button, "Button").$$render($$result, Object.assign(heroObject.cta.primary.functionality, {
    accessibilityProps: heroObject.cta.primary.accessibilityProps
  }, { color: heroObject.cta.primary.color }, { text: heroObject.cta.primary.text }, {
    classes: "w-full mx-auto mb-4 sm:mx-0 sm:mb-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  sm:px-8"
  }), {}, {})}` : ``}

            ${heroObject.cta && heroObject.cta.secondary ? `${validate_component(Button, "Button").$$render($$result, Object.assign(heroObject.cta.secondary.functionality, {
    accessibilityProps: heroObject.cta.secondary.accessibilityProps
  }, { color: heroObject.cta.secondary.color }, { text: heroObject.cta.secondary.text }, {
    classes: "w-full mx-auto sm:mx-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm sm:px-8"
  }), {}, {})}` : ``}</div></div>`;
});
const HeroFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { children = [] } = $$props;
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  return `${validate_component(children[0].component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
});
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { backgroundImage = "" } = $$props;
  let { backgroundColor = "" } = $$props;
  let { backgroundImageDescription = "" } = $$props;
  let { heroObject = {
    primaryHeader: "",
    secondaryHeader: "",
    subText: "",
    cta: {},
    heroFooter: []
  } } = $$props;
  let { overlay = "" } = $$props;
  let { children = void 0 } = $$props;
  let { backgroundHeight = "" } = $$props;
  const overlayColor = overlay || "bg-dh-primary-dark-500";
  const overlayOpacity = backgroundImage ? "opacity-50" : "";
  if ($$props.backgroundImage === void 0 && $$bindings.backgroundImage && backgroundImage !== void 0)
    $$bindings.backgroundImage(backgroundImage);
  if ($$props.backgroundColor === void 0 && $$bindings.backgroundColor && backgroundColor !== void 0)
    $$bindings.backgroundColor(backgroundColor);
  if ($$props.backgroundImageDescription === void 0 && $$bindings.backgroundImageDescription && backgroundImageDescription !== void 0)
    $$bindings.backgroundImageDescription(backgroundImageDescription);
  if ($$props.heroObject === void 0 && $$bindings.heroObject && heroObject !== void 0)
    $$bindings.heroObject(heroObject);
  if ($$props.overlay === void 0 && $$bindings.overlay && overlay !== void 0)
    $$bindings.overlay(overlay);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.backgroundHeight === void 0 && $$bindings.backgroundHeight && backgroundHeight !== void 0)
    $$bindings.backgroundHeight(backgroundHeight);
  return `<div${add_attribute("class", `w-full md:py-16 relative`, 0)}>${children ? `${validate_component(children || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `<div class="${"absolute inset-0"}">${validate_component(HeroBackground, "HeroBackground").$$render($$result, {
    backgroundImage,
    backgroundColor,
    backgroundHeight,
    imageDescription: backgroundImageDescription,
    overlayColor,
    overlayOpacity
  }, {}, {})}</div>
            <div class="${"relative px-4 pt-16 sm:px-6 sm:pt-24 lg:pt-32 lg:px-8"}">${validate_component(HeroHeaders, "HeroHeaders").$$render($$result, {
    heroPrimaryHeader: heroObject.primaryHeader,
    heroSecondaryHeader: heroObject.secondaryHeader
  }, {}, {})}
                ${validate_component(HeroSubText, "HeroSubText").$$render($$result, { heroSubText: heroObject.subText }, {}, {})}
                ${validate_component(HeroCTAs, "HeroCTAs").$$render($$result, { heroObject }, {}, {})}
                ${validate_component(HeroFooter, "HeroFooter").$$render($$result, { children: heroObject.heroFooter }, {}, {})}</div>`}</div>`;
});
const linkClasses = "text-black hover:text-dh-secondary-dark-500 dark:text-white dark:hover:text-dh-secondary-dark-500";
const ProjectCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content = "" } = $$props;
  let { title = "" } = $$props;
  let { alt = "" } = $$props;
  let { imgSrc = "" } = $$props;
  let { imgClasses = "" } = $$props;
  let { classes = "" } = $$props;
  let { projectLink = "" } = $$props;
  let { repoLink = "" } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.imgSrc === void 0 && $$bindings.imgSrc && imgSrc !== void 0)
    $$bindings.imgSrc(imgSrc);
  if ($$props.imgClasses === void 0 && $$bindings.imgClasses && imgClasses !== void 0)
    $$bindings.imgClasses(imgClasses);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.projectLink === void 0 && $$bindings.projectLink && projectLink !== void 0)
    $$bindings.projectLink(projectLink);
  if ($$props.repoLink === void 0 && $$bindings.repoLink && repoLink !== void 0)
    $$bindings.repoLink(repoLink);
  return `<div${add_attribute("class", `bg-white dark:bg-gray-800 rounded-lg shadow-lg ${classes}`, 0)}>${imgSrc ? `${validate_component(Image, "Image").$$render($$result, { classes: imgClasses, src: imgSrc, alt }, {}, {})}` : ``}
	<div class="${"p-6"}"><h2 class="${"font-bold mb-2 text-2xl text-dh-secondary-dark-500"}">${escape(title)}</h2>
		<p class="${"text-black dark:text-white mb-2"}">${escape(content)}</p>
		<div class="${"flex items-center justify-center"}">${validate_component(Button, "Button").$$render($$result, {
    classes: "border-2 py-2 px-4 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black",
    text: "View More",
    href: "/projects"
  }, {}, {})}
			${projectLink || repoLink ? `<div class="${"flex justify-end"}">${projectLink ? `<a${add_attribute("href", projectLink, 0)} target="${"_blank"}"${add_attribute("aria-label", `Link to ${title} site in new tab`, 0)}${add_attribute("class", `ml-4 ${linkClasses}`, 0)}>${validate_component(Desktop_computer, "DesktopComputer").$$render($$result, {
    formattedClassName: "w-8 h-8",
    solid: true
  }, {}, {})}</a>` : ``}
					${repoLink ? `<a${add_attribute("href", repoLink, 0)} target="${"_blank"}"${add_attribute("aria-label", `Link to ${title} repo in new tab`, 0)}${add_attribute("class", `ml-4 ${linkClasses}`, 0)}>${validate_component(Github, "Github").$$render($$result, { formattedClassName: "w-8 h-8" }, {}, {})}</a>` : ``}</div>` : ``}</div></div></div>`;
});
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { margin = "" } = $$props;
  let { padding = "" } = $$props;
  let { className = "" } = $$props;
  let p = "";
  let m = "";
  if (padding === "small") {
    p = `px-1`;
  } else if (padding === "medium") {
    p = `px-2`;
  } else if (padding === "large") {
    p = `px-4 md:px-8`;
  } else if (padding === "xlarge") {
    p = `px-4 md:px-12`;
  } else if (padding === "none") {
    p = `px-0`;
  }
  if (margin === "xsmall") {
    m = `my-2`;
  } else if (margin === "small") {
    m = `my-4`;
  } else if (margin === "medium") {
    m = `my-4 md:my-8`;
  } else if (margin === "large") {
    m = `my-12 md:my-24`;
  } else if (margin === "xlarge") {
    m = `my-24 md:my-48`;
  } else if (margin === "none") {
    m = `my-0`;
  }
  if ($$props.margin === void 0 && $$bindings.margin && margin !== void 0)
    $$bindings.margin(margin);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<div${add_attribute("class", `container mx-auto ${p} ${m} ${className || ""}`, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const CodingIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let iconColor;
  let $isDarkMode, $$unsubscribe_isDarkMode;
  $$unsubscribe_isDarkMode = subscribe(isDarkMode, (value) => $isDarkMode = value);
  iconColor = $isDarkMode ? "#000000" : "#FFFFFF";
  iconColor = "";
  $$unsubscribe_isDarkMode();
  return `<svg width="${"650px"}" height="${"265px"}" viewBox="${"0 0 650 265"}" version="${"1.1"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}"><g id="${"Website"}" stroke="${"none"}" stroke-width="${"1"}" fill="${"none"}" fill-rule="${"evenodd"}"><g id="${"Group-32"}" transform="${"translate(0.000000, 3.000000)"}"><path d="${"M126.007899,38.7650154 C126.007899,34.7383476 129.263975,31.4816286 133.298472,31.4816286 L386.871877,31.4816286 C390.898902,31.4816286 394.162451,34.7405 394.162451,38.7650154 L394.162451,212.307477 C394.162451,216.334145 390.906375,219.590864 386.871877,219.590864 L133.298472,219.590864 C129.271447,219.590864 126.007899,216.331993 126.007899,212.307477 L126.007899,38.7650154 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M142.409667,50.7365341 C142.409667,49.0123794 143.813338,47.612711 145.535934,47.612711 L374.37407,47.612711 C376.102828,47.612711 377.500337,49.004393 377.500337,50.7365341 L377.500337,180.042016 C377.500337,181.766171 376.096666,183.165839 374.37407,183.165839 L145.535934,183.165839 C143.807176,183.165839 142.409667,181.774157 142.409667,180.042016 L142.409667,50.7365341 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M240.989547,219.590864 L279.441148,219.590864 L282.037136,253.153923 L238.39356,253.153923 L240.989547,219.590864 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M222.334407,253.411496 L222.334407,256.926514 C222.334407,259.006825 224.024461,260.699106 226.104395,260.699106 L294.3263,260.699106 C296.402444,260.699106 298.096288,259.006629 298.096288,256.926514 L298.096288,253.411496 C298.096288,253.265769 297.983625,253.153923 297.834738,253.153923 L222.595957,253.153923 C222.450148,253.153923 222.334407,253.269384 222.334407,253.411496 Z"}" id="${"Keyboard"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} transform="${"translate(260.215348, 256.926514) scale(1, -1) translate(-260.215348, -256.926514) "}"></path><ellipse id="${"Oval-6"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}" cx="${"260.215348"}" cy="${"202.809335"}" rx="${"4.81639213"}" ry="${"4.81330685"}"></ellipse><rect id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} x="${"101.275074"}" y="${"159.749752"}" width="${"51.5470788"}" height="${"100.949355"}" rx="${"6.24428997"}"></rect><path d="${"M101.275074,170.937438 L152.822153,170.937438 L152.822153,245.686792 L101.275074,245.686792 L101.275074,170.937438 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"114.812374"}" y="${"164.17279"}" width="${"24.7328244"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"124.184813"}" y="${"250.031778"}" width="${"5.93587786"}" height="${"5.93207547"}" rx="${"2.96603774"}"></rect><ellipse id="${"Oval-6"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} cx="${"115.853757"}" cy="${"208.142999"}" rx="${"3.9051828"}" ry="${"3.90268123"}"></ellipse><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"124.96585"}" y="${"201.378352"}" width="${"18.2241864"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"124.96585"}" y="${"207.102284"}" width="${"13.017276"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"124.96585"}" y="${"212.826216"}" width="${"7.81036561"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><ellipse id="${"Oval-7"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} cx="${"74.8493371"}" cy="${"168.725919"}" rx="${"39.9637045"}" ry="${"39.9374379"}"></ellipse><rect id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} x="${"319.704966"}" y="${"120.462761"}" width="${"192.654351"}" height="${"129.308838"}" rx="${"6.24428997"}"></rect><path d="${"M306.42601,250.02579 L306.42601,255.235353 C306.42601,258.248347 308.874337,260.699106 311.88835,260.699106 L520.175933,260.699106 C523.187441,260.699106 525.638273,258.249893 525.638273,255.235353 L525.638273,250.02579 C525.638273,249.884133 525.525092,249.771599 525.379413,249.771599 L306.68487,249.771599 C306.538643,249.771599 306.42601,249.8841 306.42601,250.02579 Z"}" id="${"Keyboard"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M430.428848,249.888735 L401.270407,249.88823 C402.433781,252.961493 405.402425,255.091813 408.808279,255.091813 L422.891133,255.091813 C426.2974,255.091813 429.265465,252.961765 430.428848,249.888735 Z"}" id="${"Notch"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><rect id="${"Screen"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} x="${"328.295034"}" y="${"132.691162"}" width="${"175.319716"}" height="${"105.073079"}" rx="${"2.08142999"}"></rect><ellipse id="${"Oval-3"}" fill="${"#293347"}" cx="${"254.357573"}" cy="${"49.9543198"}" rx="${"1.3017276"}" ry="${"1.30089374"}"></ellipse><path d="${"M179.899422,11.9682224 L300.177718,11.9682224 L300.177718,127.227794 C300.177718,131.24909 296.908511,134.512413 292.886465,134.512413 L187.190674,134.512413 C183.165634,134.512413 179.899422,131.247907 179.899422,127.227794 L179.899422,11.9682224 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M179.899422,6.23775036 C179.899422,2.21962044 183.168858,-1.040715 187.190674,-1.040715 L292.886465,-1.040715 C296.913475,-1.040715 300.177718,2.21613142 300.177718,6.23775036 L300.177718,14.0496524 L179.899422,14.0496524 L179.899422,6.23775036 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"191.093612"}" cy="${"6.50446872"}" rx="${"2.34310968"}" ry="${"2.34160874"}"></ellipse><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"198.903978"}" cy="${"6.50446872"}" rx="${"2.34310968"}" ry="${"2.34160874"}"></ellipse><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"206.714343"}" cy="${"6.50446872"}" rx="${"2.34310968"}" ry="${"2.34160874"}"></ellipse><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"87.9404171"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"35.9046673"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><path d="${"M203.329184,35.9046673 L210.359847,35.9046673 C210.934619,35.9046673 211.400562,36.3706113 211.400562,36.9453823 C211.400562,37.5201533 210.934619,37.9860973 210.359847,37.9860973 L203.329184,37.9860973 C202.754413,37.9860973 202.288469,37.5201533 202.288469,36.9453823 C202.288469,36.3706113 202.754413,35.9046673 203.329184,35.9046673 Z"}" id="${"Rectangle-11"}" fill="${"#34D399"}"></path><path d="${"M215.044733,35.9046673 L222.075396,35.9046673 C222.650167,35.9046673 223.116111,36.3706113 223.116111,36.9453823 C223.116111,37.5201533 222.650167,37.9860973 222.075396,37.9860973 L215.044733,37.9860973 C214.469962,37.9860973 214.004018,37.5201533 214.004018,36.9453823 C214.004018,36.3706113 214.469962,35.9046673 215.044733,35.9046673 Z"}" id="${"Rectangle-11"}" fill="${"#34D399"}"></path><path d="${"M226.760281,35.9046673 L239.778891,35.9046673 C240.353662,35.9046673 240.819606,36.3706113 240.819606,36.9453823 C240.819606,37.5201533 240.353662,37.9860973 239.778891,37.9860973 L226.760281,37.9860973 C226.18551,37.9860973 225.719566,37.5201533 225.719566,36.9453823 C225.719566,36.3706113 226.18551,35.9046673 226.760281,35.9046673 Z"}" id="${"Rectangle-11"}" fill="${"#34D399"}"></path><path d="${"M244.463776,35.9046673 L263.730679,35.9046673 C264.30545,35.9046673 264.771394,36.3706113 264.771394,36.9453823 C264.771394,37.5201533 264.30545,37.9860973 263.730679,37.9860973 L244.463776,37.9860973 C243.889005,37.9860973 243.423061,37.5201533 243.423061,36.9453823 C243.423061,36.3706113 243.889005,35.9046673 244.463776,35.9046673 Z"}" id="${"Rectangle-11"}" fill="${"#34D399"}"></path><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"46.3118173"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"56.7189672"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"67.1261172"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"77.5332671"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"98.347567"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"194.478104"}" y="${"108.754717"}" width="${"4.68621937"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"46.3118173"}" width="${"18.2241864"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"223.116111"}" y="${"46.3118173"}" width="${"31.2414624"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"256.961029"}" y="${"46.3118173"}" width="${"13.017276"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"56.7189672"}" width="${"13.017276"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"217.9092"}" y="${"56.7189672"}" width="${"13.017276"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"233.529932"}" y="${"56.7189672"}" width="${"7.81036561"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"67.1261172"}" width="${"26.034552"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"230.926476"}" y="${"67.1261172"}" width="${"18.2241864"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"77.5332671"}" width="${"26.034552"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"230.926476"}" y="${"77.5332671"}" width="${"33.8449176"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"87.9404171"}" width="${"18.2241864"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"223.116111"}" y="${"87.9404171"}" width="${"18.2241864"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"243.943753"}" y="${"87.9404171"}" width="${"10.4138208"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"98.347567"}" width="${"33.8449176"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"202.288469"}" y="${"108.754717"}" width="${"15.6207312"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><path d="${"M414.991426,93.6643496 L557.659437,93.6643496 L557.659437,195.142937 C557.659437,199.162932 554.399545,202.419067 550.373649,202.419067 L422.277215,202.419067 C418.255898,202.419067 414.991426,199.157214 414.991426,195.142937 L414.991426,93.6643496 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M414.991426,87.9338775 C414.991426,83.9126798 418.251232,80.6554121 422.277215,80.6554121 L550.373649,80.6554121 C554.397843,80.6554121 557.659437,83.9124627 557.659437,87.9338775 L557.659437,95.7457795 L414.991426,95.7457795 L414.991426,87.9338775 Z"}" id="${"Case"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"426.185617"}" cy="${"88.2005958"}" rx="${"2.34310968"}" ry="${"2.34160874"}"></ellipse><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"433.995982"}" cy="${"88.2005958"}" rx="${"2.34310968"}" ry="${"2.34160874"}"></ellipse><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"441.806348"}" cy="${"88.2005958"}" rx="${"2.34310968"}" ry="${"2.34160874"}"></ellipse><ellipse id="${"Oval-6"}" stroke="${"#34D399"}" stroke-width="${"2.34160874"}"${add_attribute("fill", iconColor, 0)} cx="${"503.247891"}" cy="${"148.041708"}" rx="${"26.034552"}" ry="${"26.0178749"}"></ellipse><path d="${"M500.383423,118.901688 L500.383423,125.145978 L506.63305,125.145978 L506.63305,118.901688 L500.383423,118.901688 Z"}" id="${"Rectangle-12"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M500.123077,170.937438 L500.123077,177.181728 L506.372704,177.181728 L506.372704,170.937438 L500.123077,170.937438 Z"}" id="${"Rectangle-12"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M474.088525,145.179742 L474.088525,151.424032 L480.338152,151.424032 L480.338152,145.179742 L474.088525,145.179742 Z"}" id="${"Rectangle-12"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M525.897284,145.179742 L525.897284,151.424032 L532.146911,151.424032 L532.146911,145.179742 L525.897284,145.179742 Z"}" id="${"Rectangle-12"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><line x1="${"529.282443"}" y1="${"124.625621"}" x2="${"529.282443"}" y2="${"144.139027"}" id="${"Line"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}" stroke-linecap="${"square"}"></line><line x1="${"529.282443"}" y1="${"151.944389"}" x2="${"529.282443"}" y2="${"171.457795"}" id="${"Line"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}" stroke-linecap="${"square"}"></line><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"529.282443"}" cy="${"123.845084"}" rx="${"3.12414624"}" ry="${"3.12214499"}"></ellipse><ellipse id="${"Oval-5"}" fill="${"#34D399"}" cx="${"529.282443"}" cy="${"173.279047"}" rx="${"3.12414624"}" ry="${"3.12214499"}"></ellipse><g id="${"Group-60"}" transform="${"translate(439.463238, 115.519364)"}"${add_attribute("fill", iconColor, 0)} stroke="${"#34D399"}" stroke-width="${"2.08142999"}"><rect id="${"Rectangle-15"}" x="${"1.040715"}" y="${"1.040715"}" width="${"16.1427564"}" height="${"16.1310824"}" rx="${"3.12214499"}"></rect><rect id="${"Rectangle-15"}" x="${"1.040715"}" y="${"24.4568024"}" width="${"16.1427564"}" height="${"16.1310824"}" rx="${"3.12214499"}"></rect><rect id="${"Rectangle-15"}" x="${"1.040715"}" y="${"47.8728898"}" width="${"16.1427564"}" height="${"16.1310824"}" rx="${"3.12214499"}"></rect></g><ellipse id="${"Oval-8"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} cx="${"632.379269"}" cy="${"235.982125"}" rx="${"15.6207312"}" ry="${"15.6107249"}"></ellipse><ellipse id="${"Oval-8"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} cx="${"632.379269"}" cy="${"235.982125"}" rx="${"9.11209321"}" ry="${"9.10625621"}"></ellipse><ellipse id="${"Oval-8"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} cx="${"611.551627"}" cy="${"212.305859"}" rx="${"5.20691041"}" ry="${"5.20357498"}"></ellipse><path d="${"M588.639887,211.004965 C588.065116,211.004965 587.599172,211.470909 587.599172,212.04568 L587.599172,255.75571 C587.599172,258.629565 589.928892,260.959285 592.802747,260.959285 L628.720118,260.959285 C631.593973,260.959285 633.923693,258.629565 633.923693,255.75571 L633.923693,212.04568 C633.923693,211.470909 633.457749,211.004965 632.882978,211.004965 L588.639887,211.004965 Z"}" id="${"Rectangle-16"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><rect id="${"Rectangle-16"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)} x="${"609.728541"}" y="${"225.054618"}" width="${"13.5393012"}" height="${"16.6514399"}" rx="${"3.12214499"}"></rect><line x1="${"616.368019"}" y1="${"211.395233"}" x2="${"616.368019"}" y2="${"223.233366"}" id="${"Line-2"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}" stroke-linecap="${"square"}"></line><path d="${"M557.92045,260.699106 C566.547542,260.699106 573.541181,260.699106 573.541181,260.699106 C573.541181,252.077541 566.547542,245.088381 557.92045,245.088381 C549.293358,245.088381 542.299719,252.077541 542.299719,260.699106 C542.299719,260.699106 549.293358,260.699106 557.92045,260.699106 Z"}" id="${"Oval-8"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><rect id="${"Rectangle-11"}" fill="${"#34D399"}" x="${"556.879068"}" y="${"244.568024"}" width="${"2.08276416"}" height="${"3.38232373"}" rx="${"1.04138208"}"></rect><path d="${"M16.391389,229.997886 C7.91344584,229.997886 1.040715,236.870617 1.040715,245.34856 C1.040715,253.826503 7.91344584,260.699234 16.391389,260.699234 L79.4070531,260.699234 C80.2692097,260.699234 80.9681256,260.000318 80.9681256,259.138161 L80.9681256,256.722169 C80.9681256,255.629844 80.123732,254.723351 79.0341503,254.645969 C71.8803755,254.137863 68.0805122,250.995245 68.0805122,245.34856 C68.0805122,239.701873 71.8803788,236.559254 79.0341596,236.05115 C80.1237345,235.973762 80.9681256,235.06727 80.9681256,233.974951 L80.9681256,231.558958 C80.9681256,230.696802 80.2692097,229.997886 79.4070531,229.997886 L16.391389,229.997886 Z"}" id="${"Rectangle-17"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"${add_attribute("fill", iconColor, 0)}></path><path d="${"M80.1864202,255.299762 C80.1864202,255.551575 79.9821545,255.75571 79.73018,255.75571 L79.73018,255.75571 L72.353427,255.75571 L16.1414223,255.75571 C10.3900278,255.75571 5.72760145,251.09627 5.72760145,245.34856 C5.72760145,239.60085 10.3900278,234.94141 16.1414223,234.94141 L72.353427,234.94141 L79.73018,234.94141 L79.73018,234.94141 C79.9821545,234.94141 80.1864202,235.145545 80.1864202,235.397358"}" id="${"Rectangle-19"}" stroke="${"#34D399"}" stroke-width="${"2.08142999"}"></path><rect id="${"Rectangle-18"}" fill="${"#34D399"}" x="${"14.0586581"}" y="${"240.925521"}" width="${"54.6725593"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><rect id="${"Rectangle-18"}" fill="${"#34D399"}" x="${"14.0586581"}" y="${"247.42999"}" width="${"54.6725593"}" height="${"2.08142999"}" rx="${"1.040715"}"></rect><path d="${"M65.1265421,178.055093 C63.848875,176.91993 62.5712079,175.784766 61.2935408,174.649603 C59.2574411,172.842608 57.2271756,171.029822 55.1910759,169.222827 C54.7243482,168.81162 54.2576205,168.394621 53.7967269,167.983414 C53.7967269,168.527829 53.7967269,169.078035 53.7967269,169.622451 C55.074394,168.487287 56.3520611,167.352124 57.6297282,166.21696 C59.6658279,164.409965 61.6960934,162.597179 63.7321931,160.790184 C64.1989208,160.378977 64.6656485,159.961978 65.1265421,159.550771 C65.5816017,159.145355 65.5757676,158.317149 65.1265421,157.911734 C64.6423121,157.465777 63.965557,157.47736 63.4754929,157.911734 C62.1978257,159.046897 60.9201586,160.182061 59.6424915,161.317224 C57.6063919,163.124219 55.5761263,164.937006 53.5400267,166.744 C53.0732989,167.155208 52.6065712,167.572206 52.1456776,167.983414 C51.6964522,168.383037 51.6964522,169.222827 52.1456776,169.622451 C53.4233447,170.757614 54.7010118,171.892778 55.978679,173.027941 C58.0147786,174.834936 60.0450442,176.647722 62.0811438,178.454717 C62.5478715,178.865924 63.0145992,179.282923 63.4754929,179.69413 C63.9305524,180.099546 64.6831508,180.174837 65.1265421,179.69413 C65.5349289,179.253965 65.6107721,178.489467 65.1265421,178.055093 L65.1265421,178.055093 Z"}" id="${"Shape"}" fill="${"#34D399"}" fill-rule="${"nonzero"}"></path><path d="${"M84.5825817,159.553526 C85.8602488,160.688689 87.1379159,161.823853 88.415583,162.959016 C90.4516827,164.766011 92.4819482,166.578798 94.5180479,168.385793 C94.9847756,168.797 95.4515033,169.213999 95.9123969,169.625206 C95.9123969,169.080791 95.9123969,168.530584 95.9123969,167.986169 C94.6347298,169.121332 93.3570627,170.256496 92.0793956,171.391659 C90.0432959,173.198654 88.0130304,175.011441 85.9769307,176.818435 C85.510203,177.229643 85.0434753,177.646641 84.5825817,178.057849 C84.1275221,178.463264 84.1333562,179.29147 84.5825817,179.696886 C85.0668117,180.142843 85.7435668,180.131259 86.2336309,179.696886 C87.5112981,178.561722 88.7889652,177.426559 90.0666323,176.291395 C92.1027319,174.4844 94.1329975,172.671614 96.1690971,170.864619 C96.6358249,170.453412 97.1025526,170.036413 97.5634462,169.625206 C98.0126716,169.225582 98.0126716,168.385793 97.5634462,167.986169 C96.2857791,166.851005 95.008112,165.715842 93.7304448,164.580678 C91.6943452,162.773684 89.6640796,160.960897 87.62798,159.153902 C87.1612523,158.742695 86.6945246,158.325696 86.2336309,157.914489 C85.7785714,157.509074 85.025973,157.433782 84.5825817,157.914489 C84.1741949,158.354654 84.0983517,159.119152 84.5825817,159.553526 L84.5825817,159.553526 Z"}" id="${"Shape"}" fill="${"#34D399"}" fill-rule="${"nonzero"}"></path><path d="${"M70.6937286,184.875712 C71.0437744,183.833215 71.3879861,182.790718 71.7380319,181.74243 C72.5723077,179.234645 73.4065835,176.732652 74.2408593,174.224868 C75.2443239,171.201626 76.2477884,168.184177 77.2570871,165.160935 C78.1263675,162.548901 78.9956479,159.936867 79.8649282,157.324832 C80.2791491,156.056461 80.7458768,154.793881 81.1309271,153.508135 C81.1367612,153.49076 81.1425953,153.473385 81.1484294,153.45601 C81.3409546,152.882637 80.9267338,152.164472 80.3316559,152.031264 C79.6899053,151.886473 79.1006616,152.222388 78.8964682,152.842095 C78.5464224,153.884592 78.2022107,154.927089 77.852165,155.975378 C77.0178892,158.483162 76.1836134,160.985155 75.3493376,163.49294 C74.345873,166.516181 73.3424084,169.533631 72.3331097,172.556872 C71.4638294,175.168907 70.594549,177.780941 69.7252686,180.392975 C69.3110478,181.655555 68.8443201,182.918135 68.4592697,184.203881 C68.4534356,184.221256 68.4476015,184.238631 68.4417674,184.256006 C68.2492422,184.829379 68.6634631,185.547544 69.2585409,185.680752 C69.9002915,185.825543 70.4895353,185.489627 70.6937286,184.875712 L70.6937286,184.875712 Z"}" id="${"Shape"}" fill="${"#34D399"}" fill-rule="${"nonzero"}"></path></g></g></svg>`;
});
const HomeHeroFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex justify-center mt-8 md:mt-32"}">${validate_component(CodingIcon, "CodingIcon").$$render($$result, {}, {}, {})}</div>`;
});
const Divider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { marginTop = "" } = $$props;
  let { marginBottom = "" } = $$props;
  let { vertical = false } = $$props;
  if ($$props.marginTop === void 0 && $$bindings.marginTop && marginTop !== void 0)
    $$bindings.marginTop(marginTop);
  if ($$props.marginBottom === void 0 && $$bindings.marginBottom && marginBottom !== void 0)
    $$bindings.marginBottom(marginBottom);
  if ($$props.vertical === void 0 && $$bindings.vertical && vertical !== void 0)
    $$bindings.vertical(vertical);
  return `<div${add_attribute("class", `${marginTop} ${marginBottom}`, 0)}><div${add_attribute("class", `${vertical ? "border-l" : "border-b"} border-gray-400 dark:border-gray-700`, 0)}></div></div>`;
});
const prerender = true;
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const heroObject = {
    primaryHeader: "Full Stack Engineer, Entrepreneur, & Blockchain Enthusiast",
    secondaryHeader: "",
    subText: "Together lets change the world",
    cta: {
      primary: {
        text: "Resume",
        color: "primary",
        functionality: {
          onClick: () => {
            window.open("/static/Resume/DavidHanlonResume.pdf");
          }
        },
        accessibilityProps: { "aria-label": `Download David's Resume` }
      },
      secondary: {
        text: "Work With Me",
        color: "secondary",
        functionality: { href: "/contact" },
        accessibilityProps: { "aria-label": "Link to contact page" }
      }
    },
    heroFooter: [{ component: HomeHeroFooter }]
  };
  return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}`, ""}
${validate_component(Hero, "Hero").$$render($$result, {
    heroObject,
    backgroundColor: "bg-white dark:bg-dh-primary-dark-500",
    backgroundHeight: "100"
  }, {}, {})}
<div class="${"w-full mx-0 my-8 bg-dh-secondary-dark-500 rounded-t-3xl min-h-screen"}"><div class="${"pt-36 mx-4 md:mx-12 lg:mx-16 xl:mx-96"}"><div class="${"flex justify-center my-4"}">${validate_component(Image, "Image").$$render($$result, {
    classes: "w-48 h-48 border-none",
    src: "/Images/davidHanlon.jpg",
    alt: "Image of Me (David Hanlon)",
    circle: true
  }, {}, {})}</div>
		<h3 class="${"text-center text-2xl sm:text-4xl font-bold text-white dark:text-black pb-4"}">Hi, I\u2019m David. Nice to meet you.</h3>
		  <p class="${"text-center text-xl text-white dark:text-black"}">Since beginning my journey as an Entrepreneur and Software Engineer, I have helped build some amazing projects and collaborated with talented people to create digital products 
			for both business and consumer use. My unique skill set goes much deeper then just developing.
			   I have worked at a Start Up for over the past 2 years, built multiple E-commerce businesses, ran digital and social media advertising (Instagram, Facebook, Snapchat, and Google AdWords), 
			   and have helped many clients turn their website into their central hub for their business through the likes of SaaS solutions such as Wix, and Shopify.
			   I&#39;m naturally curious, and perpetually working on improving my skills trying to solve on problem with the help of technology at a time.
		  </p></div></div>
${validate_component(Divider, "Divider").$$render($$result, { marginBottom: "mb-8" }, {}, {})}
${validate_component(Container, "Container").$$render($$result, { className: "min-h-screen" }, {}, {
    default: () => `<h3 class="${"text-center text-2xl sm:text-4xl font-bold pb-4 text-dh-secondary-dark-500"}">My Recent Work</h3>
	<p class="${"text-lg sm:text-xl text-center text-black dark:text-white"}">Here are a few design projects I&#39;ve worked on recently that I can talk about. Want to see more?
		<a href="${"mailto:davidhanlon23@gmail.com"}" class="${"text-dh-secondary-dark-500 hover:no-underline"}">Email me</a> .
	</p>
	<div class="${"my-24 flex flex-col md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-2 md:gap-4"}">${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      classes: "my-4",
      title: "Endeavors.tv",
      content: "Due to legal reasons, I can not share the repository code or extensive details of this live streaming platform. It was built using Svelte and Rust",
      projectLink: "https://Endeavors.tv",
      imgSrc: "/Images/endeavorsTvCardImg.png"
    }, {}, {})}
		${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      classes: "my-4",
      title: "Love Calculator",
      content: "Progessive Web/Mobile Application built using Ionic Hybrid Mobile Framework, Typescript and FireBase Hosting. This app calculates % love of two names by using the ascii value of the names then converting them to percent",
      projectLink: "https://lovecalculator-bb0e8.web.app/",
      repoLink: "https://github.com/davidhanlon23/loveCalculator",
      imgSrc: "/Images/loveCalcCardImg.png"
    }, {}, {})}
		${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      classes: "my-4",
      title: "NextJS Social",
      content: "Demo Social Media application built using Server Side Rendering framework NextJS, ReactJS, and ExpressJS",
      imgSrc: "/Images/nextJsCardImg.png",
      projectLink: "https://next-js-social-media-app.herokuapp.com/",
      repoLink: "https://github.com/davidhanlon23/nextJS-social-media-app"
    }, {}, {})}
		${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      classes: "my-4",
      title: "Original Portfolio",
      content: "Original Portfolio built using ReactJS, ExpressJS and NoSQL/MongoDB",
      repoLink: "https://github.com/davidhanlon23/DavidHanlonPortfolio",
      projectLink: "https://davidmhanlon-stg.herokuapp.com/",
      imgSrc: "/Images/originalPortfolioCardImg.png"
    }, {}, {})}
		${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      classes: "my-4",
      title: "Expense Tracker",
      content: "Mobile application for tracking expenses built with Angular and Ionic Hybrid Mobile App Framework",
      repoLink: "https://github.com/davidhanlon23/ExpenseTracker",
      imgSrc: "/Images/expenseTrackerCardImg.png"
    }, {}, {})}
		${validate_component(ProjectCard, "ProjectCard").$$render($$result, {
      classes: "my-4",
      title: "Chat App",
      content: "Mobile group chat application built with Angular and Ionic Hybrid Mobile App framework",
      repoLink: "https://github.com/davidhanlon23/ChatApp",
      imgSrc: "/Images/chatAppCardImg.png"
    }, {}, {})}</div>
	<div class="${"flex justify-center my-24"}">${validate_component(Button, "Button").$$render($$result, {
      href: "/projects",
      text: "View More Projects",
      classes: "w-full mx-auto sm:mx-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm sm:px-8 text-white bg-dh-secondary-dark-500 hover:bg-white dark:hover:bg-dh-primary-dark-500 hover:text-dh-secondary-dark-500 hover:border-dh-secondary-dark-500"
    }, {}, {})}</div>`
  })}
${validate_component(Divider, "Divider").$$render($$result, { marginTop: "mt-8", marginBottom: "mb-8" }, {}, {})}
${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h3 class="${"text-center text-2xl sm:text-4xl font-bold pb-4 text-dh-secondary-dark-500"}">Interested in collaborating or hiring me?</h3>
	<p class="${"text-lg sm:text-xl text-center text-black dark:text-white"}">I\u2019m always open to discussing product design work or partnership opportunities.</p>
	<div class="${"flex justify-center my-24"}">${validate_component(Button, "Button").$$render($$result, {
      classes: "border-2 py-2 px-4 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black",
      text: "Start a Conversation",
      href: "/contact"
    }, {}, {})}</div>`
  })}
${validate_component(Divider, "Divider").$$render($$result, { marginTop: "mt-8" }, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  prerender
});
const Blockchain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"mt-16"}">${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h1 class="${"pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"}">Blockchain</h1>`
  })}</div>`;
});
var blockchain = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Blockchain
});
const secondaryHeaderClasses$1 = "text-black dark:text-white font-semibold text-2xl mt-8";
const nameOfExperienceClasses$1 = "text-black dark:text-white text-4xl hover:cursor-pointer hover:no-underline";
const taglineClasses = "italic text-black dark:text-white mt-2";
const positionClasses = "text-black dark:text-white my-2";
const dateAndLocationClasses = "text-black dark:text-white";
const listClasses = "ml-4 list-disc dark:text-white";
const logoClasses = "w-60 h-60";
const iconClasses = "w-6 h-6 mx-4";
const ExperienceSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sections = [
    {
      sectionName: "",
      sectionExperience: [
        {
          experienceName: "",
          experienceNameClasses: "",
          experienceWebsite: "",
          experienceTagline: "",
          experiencePosition: "",
          experienceDates: "",
          experienceLocation: "",
          experienceLogo: "",
          experienceLogoAlt: "",
          ariaLabel: "",
          experienceItems: [{ experience: "" }, { experience: "" }]
        }
      ]
    }
  ] } = $$props;
  if ($$props.sections === void 0 && $$bindings.sections && sections !== void 0)
    $$bindings.sections(sections);
  return `${each(sections, (section) => `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h2${add_attribute("class", `${secondaryHeaderClasses$1}`, 0)}>${escape(section.sectionName)}</h2>
    `
  })}
    ${each(section.sectionExperience, (experience2) => `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex flex-col md:flex-row md:w-full mt-8"}"><div><h3><a${add_attribute("class", `${nameOfExperienceClasses$1} ${experience2.experienceNameClasses || ""}`, 0)} target="${"_blank"}"${add_attribute("href", experience2.experienceWebsite, 0)}${add_attribute("aria-label", experience2.ariaLabel, 0)}>${escape(experience2.experienceName)}
                        </a></h3>
    
                    <p${add_attribute("class", `${taglineClasses}`, 0)}>${escape(experience2.experienceTagline)}</p>
                    <h4${add_attribute("class", `${positionClasses}`, 0)}>${escape(experience2.experiencePosition)}</h4>
                    <div class="${"flex my-4"}"><div class="${"flex"}">${validate_component(Icon, "Icon").$$render($$result, {
      classes: iconClasses,
      name: "calendar",
      color: "primary",
      solid: true
    }, {}, {})}
                            <p${add_attribute("class", `${dateAndLocationClasses}`, 0)}>${escape(experience2.experienceDates)} </p></div>
                        <div class="${"flex"}">${validate_component(Icon, "Icon").$$render($$result, {
      classes: iconClasses,
      name: "location",
      color: "primary",
      solid: true
    }, {}, {})}
                            <p${add_attribute("class", `${dateAndLocationClasses}`, 0)}>${escape(experience2.experienceLocation)}</p>
                        </div></div>
                    <ul${add_attribute("class", `${listClasses}`, 0)}>${each(experience2.experienceItems, (items) => `<li>${escape(items.experience)}</li>`)}
                    </ul></div>
                <div class="${"flex justify-center mt-8 md:mt-0 md:justify-start md:w-full"}">${validate_component(Image, "Image").$$render($$result, {
      classes: logoClasses,
      src: `${experience2.experienceLogo}`,
      alt: experience2.experienceLogoAlt
    }, {}, {})}
                </div></div>
        `
  })}`)}
    ${validate_component(Divider, "Divider").$$render($$result, { marginBottom: "mb-8", marginTop: "mt-8" }, {}, {})}`)}`;
});
const secondaryHeaderClasses = "text-black dark:text-white font-semibold text-2xl my-8";
const nameOfExperienceClasses = "text-black dark:text-white text-4xl hover:cursor-pointer hover:no-underline";
const educationTaglinClasses = "text-black dark:text-white";
const iconTextClasses = "ml-4 text-black dark:text-white";
const EducationSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sections = [
    {
      sectionName: "",
      sectionEducation: [
        {
          educationType: "",
          educationDates: "",
          educationGPA: "",
          education: [
            {
              educationName: "",
              educationNameClasses: "",
              educationTagline: ``,
              educationsWebsite: "",
              educationsWebsiteAriaLabel: "",
              educationsLogo: "",
              educationsLogoAlt: ""
            }
          ]
        }
      ]
    }
  ] } = $$props;
  if ($$props.sections === void 0 && $$bindings.sections && sections !== void 0)
    $$bindings.sections(sections);
  return `${each(sections, (section) => `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h2${add_attribute("class", `${secondaryHeaderClasses}`, 0)}>${escape(section.sectionName)}</h2>
    `
  })}
    ${each(section.sectionEducation, (education) => `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h3 class="${"text-2xl font-semibold text-black dark:text-white"}">${escape(education.educationType)}</h3>
            <div class="${"flex my-4"}">${validate_component(Icon, "Icon").$$render($$result, {
      classes: "w-6 h-6",
      name: "calendar",
      color: "primary",
      solid: true
    }, {}, {})}
                <p${add_attribute("class", iconTextClasses, 0)}>${escape(education.educationDates)}</p></div>
            <div class="${"flex my-4"}">${validate_component(Icon, "Icon").$$render($$result, {
      classes: "w-6 h-6",
      name: "academic-cap",
      color: "primary",
      solid: true
    }, {}, {})}
                <p${add_attribute("class", iconTextClasses, 0)}>${escape(education.educationGPA)}</p></div>
            ${each(education.education, (school) => `<div class="${"flex flex-col md:flex-row md:w-full mt-8"}"><div><h4><a${add_attribute("href", school.educationsWebsite, 0)}${add_attribute("class", `${nameOfExperienceClasses} ${school.educationNameClasses}`, 0)} target="${"_blank"}"${add_attribute("aria-label", school.educationsWebsiteAriaLabel, 0)}>${escape(school.educationName)}
                            </a></h4>
                        <p${add_attribute("class", `${educationTaglinClasses}`, 0)}>${escape(school.educationTagline)}</p></div>
                    <div class="${"flex justify-center mt-8 md:mt-0 md:justify-start md:w-full"}">${validate_component(Image, "Image").$$render($$result, {
      classes: "w-60 h-60",
      src: school.educationsLogo,
      alt: school.educationsLogoAlt
    }, {}, {})}</div>
                </div>`)}
            
        `
  })}`)}`)}`;
});
const experienceObject = [
  {
    sectionName: "Work Experience",
    sectionExperience: [
      {
        experienceName: "Cybrary",
        experienceNameClasses: "hover:text-green-500 dark:hover:text-green-500",
        experienceWebsite: "https://www.cybrary.it/",
        experienceTagline: "Cybrary is an IT/Cybersecurity training and career development platform supporting over 3 million users worldwide.",
        experiencePosition: "Frontend Software Engineer",
        experienceDates: "September 2020 - Present",
        experienceLocation: "College Park, MD",
        experienceLogo: "/Images/cybrary3.png",
        experienceLogoAlt: "Cybrary Logo",
        ariaLabel: "Opens Cybrary's site in new tab",
        experienceItems: [
          {
            experience: `Collaborate with team members to coordinate large project releases in a timely manner`
          },
          {
            experience: `Assisted in the development of multiple B2B and B2C features including the user goals
                                features for our product application which resulted in improved engagement throughout the
                                platform and lowering our B2C customer churn rate increasing the company\u2019s overall revenue
                                and customer retention rate`
          },
          {
            experience: `Assisted in the entire redesign of the frontend of the product application which provided a
                                more positive user experience for our 3 million+ users.`
          },
          {
            experience: `Improve the product application\u2019s accessibility issues which directly resulted in the closing of
                                multiple B2B deals with various government agencies providing additional long term revenue
                                streams for the company`
          },
          {
            experience: `Implement Tailwind CSS framework to replace Semantic UI in order to improve SEO and the
                                marketing application\u2019s build speed which improved users\u2019 experience and led to marketing
                                being able to generate more B2C customers.`
          },
          {
            experience: `Help improve architecture of the marketing application by changing information that was
                                fetched from our Content Management System (Contentful) during render to being fetched
                                during build time which resulted in higher seo scores, faster page load times, and improved
                                user experience`
          },
          {
            experience: `Fix Cumulative Layout Shift (CLS), First Contentful Paint (FCP) and update our browser polyfill
                                configurations to improve seo scores.`
          }
        ]
      },
      {
        experienceName: "Stanley Black & Decker",
        experienceNameClasses: "hover:text-yellow-500 dark:hover:text-yellow-500",
        experienceWebsite: "https://www.stanleyblackanddecker.com/",
        experienceTagline: "Stanley Black & Decker is a growing fortune 500 company that is constantly expanding into different global emerging markets.",
        experiencePosition: "Full Stack Junior Software Engineer",
        experienceDates: "August 2019 - September 2020",
        experienceLocation: "Middle River, MD",
        experienceLogo: "/Images/sbdLogo.jpg",
        experienceLogoAlt: "Stanley Black and Decker Logo",
        ariaLabel: "Opens SBD's site in new tab",
        experienceItems: [
          {
            experience: `Conducted junior level full-stack (PostgreSQL, Express, ReactJS, NodeJS) development on
                                Stanley Security\u2019s Business to Business (B2B) & Business to Consumer (B2C) E-Commerce
                                applications from August, 2019 to January 2020 which resulted in various enhancements to
                                improve the fulfillment process of orders, flexibility of the application for business to make
                                changes easily through the use of Drupal\u2019s CMS, and bug fixes in order to improve the overall
                                user experience of the application.`
          },
          {
            experience: `While conducting Junior level development, I improved the dev-ops practices of the project by
                                effectively communicating to off-shore resources the business\u2019s requirements which
                                improved efficiency of sprints`
          },
          {
            experience: `Helped improve the use of Agile by shortening daily scrum meetings and keeping them on
                                track which increased the team\u2019s overall productivity.`
          },
          {
            experience: `Implemented more modern git workflow as well as a peer review system to improve
                                application version control and reduce risk of application bugs and down time`
          },
          {
            experience: `Enforced refactoring iterations to improve the applications run/load times which resulted in
                                improved user experience and faster load times.`
          },
          {
            experience: `While a part of the NodeJS project, I simultaneously started onboarding for the Java, Java
                                Spring, & Hybris SAP based E-commerce project for a brief amount of time before the
                                company began its rebadging process.`
          },
          {
            experience: `From February,2020 to September, I served as a technical resource on our GDPR compliance
                                project by adding, validating & fixing OneTrust and Google Tag Manager implementations
                                across Stanley Security\u2019s 20+ European websites which resulted in significantly less financial
                                risk from GDPR audits.`
          }
        ]
      }
    ]
  },
  {
    sectionName: "Internship Experience",
    sectionExperience: [
      {
        experienceName: "Cybrary",
        experienceNameClasses: "hover:text-green-500 dark:hover:text-green-500",
        experienceWebsite: "https://www.cybrary.it/",
        experienceTagline: "Cybrary is an IT/Cybersecurity training and career development platform supporting over 3 million users worldwide.",
        experiencePosition: "Intern Software Engineer",
        experienceDates: "June 2018 - August 2018",
        experienceLocation: "Greenbelt, MD",
        experienceLogo: "/Images/cybrary3.png",
        experienceLogoAlt: "Cybrary Logo",
        ariaLabel: "Opens Cybrary's site in new tab",
        experienceItems: [
          {
            experience: `Automated the Executive Dashboard using JavaScript and Google technologies and APIs which
                                resulted in reducing errors and increasing productivity among leadership through the
                                elimination of manual entry.`
          },
          {
            experience: `Increased the frequency of the automated Executive Dashboard from monthly to weekly which
                                provided the leadership team with more accurate and timely information on which to act.`
          },
          {
            experience: `Conducted Data Exports for requested customers which resulted in improved customer
                                relations`
          }
        ]
      },
      {
        experienceName: "Electronic Transaction Systems (ETS)",
        experienceNameClasses: "hover:text-blue-500 dark:hover:text-blue-500",
        experienceWebsite: "https://www.elavonpayments.com/",
        experienceTagline: "ETS, now known as Elavon Payments and Emoney is an international corporation that offers merchant services to clients seeking comprehensive Payment Card Industry (PCI)-compliant merchant processing solutions",
        experiencePosition: "Intern Software Engineer",
        experienceDates: "June 2017 - August 2017",
        experienceLocation: "Berlin, MD",
        experienceLogo: "/Images/etsLogo.png",
        experienceLogoAlt: "ETS Logo",
        ariaLabel: "Opens Elavon Payment's site in new tab",
        experienceItems: [
          {
            experience: `Most of internship consisted of individual research using online resources such as Udemy and
                                Codecademy learning NodeJS, Ionic framework and hybrid mobile app development practices`
          },
          {
            experience: `Conducted research on competitors for upper management which resulted in more
                                informative marketing decisions`
          },
          {
            experience: `Learned how to use Sketch, and InVision in order to create UI/UX prototypes`
          },
          {
            experience: `Consulted with Software Development team to aid in uncovering any bugs on the company\u2019s
                                website, and EMoney virtual wallet mobile application`
          }
        ]
      },
      {
        experienceName: "Sprout Creatives",
        experienceNameClasses: "hover:text-green-300 dark:hover:text-green-300",
        experienceWebsite: "https://www.sproutcreatives.com/",
        experienceTagline: "Sprout Creatives is a full-service website and graphic design firm that specializes in growing small businesses.",
        experiencePosition: "Intern Web Developer",
        experienceDates: "June 2015 - August 2015",
        experienceLocation: "Berlin, MD",
        experienceLogo: "/Images/sproutLogo2.png",
        experienceLogoAlt: "Sprout Creative's Logo",
        ariaLabel: "Opens Sprout Creative's site in new tab",
        experienceItems: [
          {
            experience: `Used HTML5, CSS, JavaScript, Business Catalyst, Adobe\u2019s Photoshop, and Adobe\u2019s DreamWeaver, to assist in the developing, deploying, and maintaining of customers\u2019 websites.`
          },
          {
            experience: `Backed up files from websites to local directories for instant recovery in the event of website failure.`
          }
        ]
      }
    ]
  }
];
const educationObject = [
  {
    sectionName: "Education",
    sectionEducation: [
      {
        educationType: "College",
        educationDates: " August 2015 - May 2019",
        educationGPA: "GPA: 3.16/4.00",
        education: [
          {
            educationName: "Towson University",
            educationNameClasses: "hover:text-yellow-500 dark:hover:text-yellow-500",
            educationTagline: "Towson University is a Liberal Arts university in northern Baltimore County, Maryland where I completed my Bachelor's degree in Computer Science",
            educationsWebsite: "https://www.towson.edu/",
            educationsWebsiteAriaLabel: "Opens Towson's site in new tab",
            educationsLogo: "/Images/towsonLogo2.jpeg",
            educationsLogoAlt: "Towson's Logo"
          }
        ]
      },
      {
        educationType: "High School",
        educationDates: "August 2011 - May 2015",
        educationGPA: "GPA: 4.25/5.00",
        education: [
          {
            educationName: "Worcester Technical High School",
            educationNameClasses: "hover:text-red-800 dark:hover:text-red-800",
            educationTagline: `Worcester Technical High School is vocational high school in Worcester County, Maryland that offers STEM and trade related courses. I attended WTHS to complete the 4 year Pre-Engineering program while concurrently attending Pocomoke High School.`,
            educationsWebsite: "https://worcestertechhs.com/",
            educationsWebsiteAriaLabel: "Opens WTHS's site in new tab",
            educationsLogo: "/Images/wthsLogo1.jpg",
            educationsLogoAlt: "WTHS's Logo"
          },
          {
            educationName: "Pocomoke High School",
            educationNameClasses: "hover:text-blue-800 dark:hover:text-blue-800",
            educationTagline: `Pocomoke High School is the primary high school I was enrolled at where I studied Core classes and AP Computer Science`,
            educationsWebsite: "https://www.pocomokehighschool.org/",
            educationsWebsiteAriaLabel: "Opens Pocomoke's site in new tab",
            educationsLogo: "/Images/phsLogo.jpeg",
            educationsLogoAlt: "Pocomoke's Logo"
          }
        ]
      }
    ]
  }
];
const Experience = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"py-16"}">${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h1 id="${"page-title"}" class="${"pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"}">Experience</h1>`
  })}
    ${validate_component(ExperienceSection, "ExperienceSection").$$render($$result, { sections: experienceObject }, {}, {})}
    ${validate_component(EducationSection, "EducationSection").$$render($$result, { sections: educationObject }, {}, {})}</div>`;
});
var experience = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Experience
});
const projectsObject = [
  {
    projectName: "Test Project",
    projectWebsite: "https://www.google.com",
    projectRepoLink: "https://www.github.com/",
    projectDescription: `Lorem ipsum dolor sit amet, vitae porta sapien imperdiet at. Morbi massa felis, lacinia ac purus et, eleifend imperdiet ligula. Phasellus accumsan ante eros, a tincidunt justo tempus eu. Integer egestas fermentum imperdiet. Nulla eget massa ex. Vivamus dapibus justo consequat neque aliquam, et mattis leo facilisis. Nam lacus est, sagittis congue mi ac, accumsan ultricies ligula. Ut semper, justo nec laoreet dapibus, diam ligula porta elit, vitae dictum arcu eros id dui. Ut ac sem interdum, porta magna vitae`,
    projectImageUrl: "/Images/needToEdit.png",
    projectLabelYear: "2021"
  },
  {
    projectName: "Endeavors.tv",
    projectWebsite: "https://Endeavors.tv",
    projectRepoLink: "",
    projectDescription: `Endeavors.tv previously known as Sleepless Gamers is a live streaming platform that was built with the intent of solving low volume viewership for entry level streamers. This platform was originally built with React, GoLang, JS, and TailwindCSS but is now running on Svelte, TypeScript, TailwindCSS and Rust `,
    projectImageUrl: "/Images/projectImages/sleeplessGamersProject.webp",
    projectLabelYear: "2021"
  },
  {
    projectName: "NextJS Social",
    projectWebsite: "https://next-js-social-media-app.herokuapp.com/",
    projectRepoLink: "https://github.com/davidhanlon23/nextJS-social-media-app",
    projectDescription: `NextJS Social is a fully functional demo social media application that I built using React, NextJS, ExpressJS, and MongoDB/NoSQL in order to practice building projects with Server Side Rendering.`,
    projectImageUrl: "/Images/projectImages/nextJsProject.webp",
    projectLabelYear: "2019"
  },
  {
    projectName: "Original Portfolio",
    projectWebsite: "https://davidmhanlon-stg.herokuapp.com/",
    projectRepoLink: "https://github.com/davidhanlon23/DavidHanlonPortfolio",
    projectDescription: `My original website portfolio was built using ReactJS, JS, BootstrapCSS, ExpressJS and MongoDB/NoSql. This site is currently hosted on the Heroku platform.`,
    projectImageUrl: "/Images/projectImages/davidHPortfolio.webp",
    projectLabelYear: "2019"
  },
  {
    projectName: "Love Calculator",
    projectWebsite: "https://lovecalculator-bb0e8.web.app/",
    projectRepoLink: "https://github.com/davidhanlon23/loveCalculator",
    projectDescription: `Love Calculator is a progressive web app I built for fun to better understand using Ionic's hybrid mobile application framework. The calculator takes the sum of the ASCII value of the two inputs and runs it through a function that calculates the "percent love" of two individuals. This project was built with JS, Angular, and Ionic's Mobile Framework hosted with firebase`,
    projectImageUrl: "/Images/projectImages/loveCalculatorProject.webp",
    projectLabelYear: "2016"
  },
  {
    projectName: "Expense Tracker",
    projectWebsite: "",
    projectRepoLink: "https://github.com/davidhanlon23/ExpenseTracker",
    projectDescription: `Expense Tracker is a simple app to record and keep track of your recent transactions. This app was built using Ionic Hybrid Mobile Application Framework, and AngularJS.`,
    projectImageUrl: "/Images/projectImages/expenseTrackerProject.webp",
    projectLabelYear: "2016"
  },
  {
    projectName: "Chat App",
    projectWebsite: "",
    projectRepoLink: "https://github.com/davidhanlon23/ChatApp",
    projectDescription: `Chat App is a chat application built using Firebase Authentication, Angular, Ionic Hybrid Mobile Application Framework and ExpressJS. Simple app that allowed multiple users to converse in a single chat room. `,
    projectImageUrl: "/Images/projectImages/chatAppProject.webp",
    projectLabelYear: "2016"
  }
];
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let { classes = "" } = $$props;
  let { icon = "" } = $$props;
  const additionalClasses = `px-1.5 py-0.5 mx-2 text-xs text-white dark:text-black font-bold bg-dh-secondary-dark-500 rounded ${icon ? "flex" : "inline-block"} `;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  return `<div${add_attribute("class", additionalClasses + classes, 0)}>${icon ? `${validate_component(Icon, "Icon").$$render($$result, {
    name: icon,
    classes: "w-4 text-left mr-2",
    color: "white"
  }, {}, {})}` : ``}
	${escape(value)}</div>`;
});
const ctaClasses = "w-full mx-auto mb-4 sm:mx-0 sm:mb-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  sm:px-8";
const ProjectSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { projects: projects2 = [
    {
      projectName: "",
      projectWebsite: "",
      projectRepoLink: "",
      projectDescription: ``,
      projectImageUrl: "",
      projectLabelYear: ""
    }
  ] } = $$props;
  if ($$props.projects === void 0 && $$bindings.projects && projects2 !== void 0)
    $$bindings.projects(projects2);
  return `${each(projects2, (project) => `${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<div class="${"flex flex-wrap justify-center flex-col md:flex-row my-16 md:w-full"}"><div class="${"md:max-w-md md:mt-2"}">
            ${validate_component(Image, "Image").$$render($$result, { src: project.projectImageUrl }, {}, {})}</div>
        <div class="${"mt-8 md:mt-0 md:max-w-md mx-auto"}"><div class="${"flex mb-12 text-center justify-center md:justify-start"}"><h2 class="${"text-3xl font-bold text-black dark:text-white"}">${escape(project.projectName)}</h2>
                ${validate_component(Label, "Label").$$render($$result, {
      classes: "my-auto items-center",
      value: project.projectLabelYear
    }, {}, {})}</div>
            <div><p class="${"text-black dark:text-white text-center md:text-left"}">${escape(project.projectDescription)}</p></div>
            <div${add_attribute("class", `flex my-8 ${project.projectWebsite && project.projectRepoLink ? "flex-col md:flex-row" : "flex-row"}`, 0)}>${project.projectWebsite ? `${validate_component(Button, "Button").$$render($$result, {
      classes: `${ctaClasses} ${project.projectRepoLink ? "md:mr-8" : ""}`,
      text: "Visit Website",
      color: "primary",
      href: `${project.projectWebsite}`,
      accessibilityProps: {
        "aria-label": `Open ${project.projectName} in a new tab`
      },
      target: "_blank"
    }, {}, {})}` : ``}
                ${project.projectRepoLink ? `${validate_component(Button, "Button").$$render($$result, {
      classes: `${ctaClasses}`,
      text: "Visit Repo",
      color: "secondary",
      href: `${project.projectRepoLink}`,
      accessibilityProps: {
        "aria-label": `Open ${project.projectName}'s repo in a new tab`
      },
      target: "_blank"
    }, {}, {})}` : ``}</div>
        </div></div>
`
  })}
${validate_component(Divider, "Divider").$$render($$result, {}, {}, {})}`)}`;
});
const Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"mt-16"}">${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h1 class="${"pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"}">Projects</h1>`
  })}
    <div class="${"mt-8"}">${validate_component(ProjectSection, "ProjectSection").$$render($$result, { projects: projectsObject }, {}, {})}</div></div>`;
});
var projects = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Projects
});
const inputClasses = "border border-gray-200 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-900 text-black dark:text-white text-xl";
const labelClasses = "text-black dark:text-white text-xl font-normal mb-2";
const ContactForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<form class="${"my-8"}" id="${"contact-form"}" method="${"POST"}" action="${"/api/contact"}" enctype="${"multipart/form-data"}"><div class="${"flex flex-col md:flex-row mb-8"}"><div class="${"flex flex-col md:mr-4"}"><label for="${"contact-form-name"}"${add_attribute("class", `${labelClasses}`, 0)}>Name</label>
            <input id="${"contact-form-name"}" name="${"name"}" type="${"text"}"${add_attribute("class", `${inputClasses} h-10 p-4`, 0)} required></div>
        <div class="${"flex flex-col"}"><label for="${"contact-form-email"}"${add_attribute("class", `${labelClasses}`, 0)}>Email</label>
            <input id="${"contact-form-email"}" name="${"email"}" type="${"text"}"${add_attribute("class", `${inputClasses} h-10 p-4`, 0)} required></div></div>
    <div class="${"flex flex-col"}"><label for="${"contact-form-message"}"${add_attribute("class", `${labelClasses}`, 0)}>Message</label>
        <textarea id="${"contact-form-message"}" name="${"message"}" type="${"text"}" placeholder="${"How can I assist you?"}"${add_attribute("class", `${inputClasses} p-4 h-56`, 0)} required></textarea></div>
    <div class="${"mt-8 flex justify-center"}">${validate_component(Button, "Button").$$render($$result, {
    classes: "border-2 py-2 px-12 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black",
    text: "Submit",
    type: "submit"
  }, {}, {})}</div></form>`;
});
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"py-16 min-h-screen"}">${validate_component(Container, "Container").$$render($$result, { className: "" }, {}, {
    default: () => `<h1 class="${"pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"}">Thanks for taking the time to reach out. How can I help you today?</h1>
        <div class="${"mt-8 flex justify-center"}">${validate_component(ContactForm, "ContactForm").$$render($$result, {}, {}, {})}</div>`
  })}</div>`;
});
var contact = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Contact
});
const iconNameClasses = "text-md font-semibold text-black dark:text-white flex justify-center";
const iconContainerClasses = "my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-24";
const sectionClasses = "pt-16 text-lg font-bold text-dh-primary-dark-500 dark:text-white text-center";
const sectionContainerClasses = "flex justify-center";
const iconWrapperClasses = "flex flex-col";
const Skills = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"py-16"}">${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h1 class="${"pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"}">Technical Skills</h1>
        
        
        <h2${add_attribute("class", `${sectionClasses}`, 0)}>Used Most Frequently</h2>
        <div${add_attribute("class", `${sectionContainerClasses}`, 0)}><div${add_attribute("class", `${iconContainerClasses}`, 0)}><div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-react-original colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>ReactJS </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-javascript-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>JavaScript </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-nodejs-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>NodeJS </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-tailwindcss-original-wordmark colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>TailwindCSS </h3></div>  

                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-html5-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>HTML5 </h3></div>  
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-github-original colored dark:text-white text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Github </h3></div></div></div>

        
        <h2${add_attribute("class", `${sectionClasses}`, 0)}>Familiar With</h2>
        <div${add_attribute("class", `${sectionContainerClasses}`, 0)}><div${add_attribute("class", `${iconContainerClasses}`, 0)}><div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-svelte-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Svelte </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-python-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Python </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-mongodb-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>MongoDB </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-mysql-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>MySQL </h3></div>

                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-google-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Google App Script </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-drupal-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Drupal CMS </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-java-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Java </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-express-original colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>ExpressJS </h3></div>

                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-bootstrap-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Boostrap </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-heroku-original colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Heroku </h3></div></div></div>
       

        
        <h2${add_attribute("class", `${sectionClasses}`, 0)}>Future Interests</h2>
        <div${add_attribute("class", `${sectionContainerClasses}`, 0)}><div${add_attribute("class", `${iconContainerClasses}`, 0)}><div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-go-original-wordmark colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>GoLang </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-rust-plain colored dark:text-white text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Rust </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-react-original colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>React Native </h3></div>
                <div${add_attribute("class", `${iconWrapperClasses}`, 0)}><i class="${"devicon-swift-plain colored text-9xl"}"></i>
                    <h3${add_attribute("class", `${iconNameClasses}`, 0)}>Swift </h3></div></div></div>`
  })}</div>`;
});
var skills = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Skills
});
const textClasses = "text-black dark:text-white text-xl";
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"py-16"}">${validate_component(Container, "Container").$$render($$result, {}, {}, {
    default: () => `<h1 class="${"pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center"}">About Me</h1>
        <div class="${"py-16 flex justify-center flex-col md:flex-row"}"><div class="${"flex justify-center my-8"}">${validate_component(Image, "Image").$$render($$result, {
      classes: "w-72 h-72 border-none",
      src: "/Images/davidHanlon.jpg",
      alt: "Image of Me (David Hanlon)",
      circle: true
    }, {}, {})}</div> 
            <div class="${"flex flex-col justify-items-center text-center md:text-left w-full sm:w-2/3 md:w-1/2 md:ml-16 my-8 m-auto md:m-0"}"><h2 class="${"text-black dark:text-white font-bold text-xl"}">Hi, I am David Hanlon.</h2>
                <br>
                <p${add_attribute("class", `${textClasses}`, 0)}>I am an ambitious, optimistic, and dependable Associate Level Software Engineer with a passion for developing software and pushing the limits of my current programming and problem solving skillset.</p>
                <br>
                <p${add_attribute("class", `${textClasses}`, 0)}>I have many hobbies but the one I am passionate about most is my dedication and commitment to the persuit of life long learning. I am always looking for opportunities to grow as an individual and projects that give me an opportunity to make a difference and do something meaningful.
                </p>
                <br>
                <p${add_attribute("class", `${textClasses}`, 0)}>As an entrepreneurial minded software engineer I am always looking to innovate and stay at the cutting edge of technology. I believe technology has the power to solve many problems and change the world and because of this I take pride in trying to be a pioneer for the future of the web and staying at the forefront of the latest trends within the technology world.
                </p></div></div>
        <div class="${"flex justify-center"}">${validate_component(Button, "Button").$$render($$result, {
      classes: "border-2 py-2 px-4 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black",
      text: "Start a Conversation",
      href: "/contact"
    }, {}, {})}</div>`
  })}</div>`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});
export { init, render };
