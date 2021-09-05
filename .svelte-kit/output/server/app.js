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
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
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
  function subscribe(run2, invalidate = noop) {
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
  return { set, update, subscribe };
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
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
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
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
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
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
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
      fail(err);
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
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
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
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
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
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
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
      context: { ...context }
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
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
const escaped$2 = {
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
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
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
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
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
    context: {},
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
      context: loaded ? loaded.context : {},
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
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
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
                    context: node_loaded.context,
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
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    });
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
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
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
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
      context: new Map(parent_component ? parent_component.$$.context : context || []),
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
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}";
const css$1 = {
  code: "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}</style>"],"names":[],"mappings":"AAqDO,gCAAiB,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,CAAC,SAAS,MAAM,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC"}`
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
  $$result.css.add(css$1);
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
const template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/favicon.png" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		<title>David M. Hanlon</title>\r\n		' + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
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
      file: assets + "/_app/start-3a1e82cc.js",
      css: [assets + "/_app/assets/start-464e9d0a.css"],
      js: [assets + "/_app/start-3a1e82cc.js", assets + "/_app/chunks/vendor-97b7dfe5.js"]
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
  assets: [{ "file": "apex.png", "size": 468834, "type": "image/png" }, { "file": "csgo.png", "size": 393325, "type": "image/png" }, { "file": "dota2.png", "size": 455983, "type": "image/png" }, { "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "fornite.png", "size": 494538, "type": "image/png" }, { "file": "legends.png", "size": 359031, "type": "image/png" }, { "file": "robots.txt", "size": 70, "type": "text/plain" }, { "file": "svelte-welcome.png", "size": 360807, "type": "image/png" }, { "file": "svelte-welcome.webp", "size": 115470, "type": "image/webp" }, { "file": "valorant.png", "size": 431001, "type": "image/png" }, { "file": "warzone.png", "size": 474341, "type": "image/png" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
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
  })
};
const metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-2e0024be.js", "css": ["assets/pages/__layout.svelte-9028f881.css"], "js": ["pages/__layout.svelte-2e0024be.js", "chunks/vendor-97b7dfe5.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-27522f63.js", "css": [], "js": ["error.svelte-27522f63.js", "chunks/vendor-97b7dfe5.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-ee421d34.js", "css": ["assets/pages/index.svelte-fef25047.css"], "js": ["pages/index.svelte-ee421d34.js", "chunks/vendor-97b7dfe5.js"], "styles": [] } };
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
var app = '@import url("https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");@font-face{font-display:swap;font-family:Fira Mono;font-style:normal;font-weight:400;src:url(__VITE_ASSET__b3140dd3__) format("woff2"),url(__VITE_ASSET__0d19eb5d__) format("woff");unicode-range:U+0460-052f,U+1c80-1c88,U+20b4,U+2de0-2dff,U+a640-a69f,U+fe2e-fe2f}@font-face{font-display:swap;font-family:Fira Mono;font-style:normal;font-weight:400;src:url(__VITE_ASSET__046b609f__) format("woff2"),url(__VITE_ASSET__0d19eb5d__) format("woff");unicode-range:U+0400-045f,U+0490-0491,U+04b0-04b1,U+2116}@font-face{font-display:swap;font-family:Fira Mono;font-style:normal;font-weight:400;src:url(__VITE_ASSET__8659ae46__) format("woff2"),url(__VITE_ASSET__0d19eb5d__) format("woff");unicode-range:U+1f??}@font-face{font-display:swap;font-family:Fira Mono;font-style:normal;font-weight:400;src:url(__VITE_ASSET__1f8b3a07__) format("woff2"),url(__VITE_ASSET__0d19eb5d__) format("woff");unicode-range:U+0370-03ff}@font-face{font-display:swap;font-family:Fira Mono;font-style:normal;font-weight:400;src:url(__VITE_ASSET__b6331a25__) format("woff2"),url(__VITE_ASSET__0d19eb5d__) format("woff");unicode-range:U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff}@font-face{font-display:swap;font-family:Fira Mono;font-style:normal;font-weight:400;src:url(__VITE_ASSET__a2f9dbe8__) format("woff2"),url(__VITE_ASSET__0d19eb5d__) format("woff");unicode-range:U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd}\n/*! tailwindcss v2.2.9 | MIT License | https://tailwindcss.com*/\n/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */html{-webkit-text-size-adjust:100%;line-height:1.15;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji}hr{color:inherit;height:0}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:transparent;background-image:none}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{border:0 solid;box-sizing:border-box}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:-moz-focusring{outline:auto}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{color:inherit;line-height:inherit;padding:0}code,kbd,pre,samp{font-family:Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-border-opacity:1;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;border-color:rgba(229,231,235,var(--tw-border-opacity))}:root{--font-mono:"Fira Mono",monospace;--pure-white:#fff;--primary-color:#b9c6d2;--secondary-color:#d0dde9;--tertiary-color:#edf0f8;--accent-color:#ff3e00;--heading-color:rgba(0,0,0,0.7);--text-color:#444;--background-without-opacity:hsla(0,0%,100%,0.7);--column-width:42rem;--column-margin-top:4rem;font-family:Barlow,Arial,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}body{margin:0;min-height:100vh}body:before{background:radial-gradient(50% 50% at 50% 50%,var(--pure-white) 0,hsla(0,0%,100%,0) 100%);content:"";height:100vh;left:10vw;opacity:.05;position:absolute;top:0;width:80vw;z-index:-1}#svelte{display:flex;flex-direction:column;min-height:100vh}h1,h2,p{color:var(--heading-color);font-weight:400}p{line-height:1.5}a{color:var(--accent-color);text-decoration:none}a:hover{text-decoration:underline}h1{font-size:2rem;margin-bottom:0 0 1em 0}h2{font-size:1rem}pre{background-color:hsla(0,0%,100%,.45);border-radius:3px;box-shadow:2px 2px 6px rgb(255 255 255/25%);color:var(--text-color);font-family:var(--font-mono);font-size:16px;overflow-x:auto;padding:.5em}button,input{font-family:inherit;font-size:inherit}button:focus:not(:focus-visible){outline:none}@media (min-width:720px){h1{font-size:2.4rem}}.absolute{position:absolute}.relative{position:relative}.inset-0{bottom:0;top:0}.inset-0,.inset-x-0{left:0;right:0}.bottom-0{bottom:0}.m-auto{margin:auto}.mx-16{margin-left:4rem;margin-right:4rem}.my-4{margin-bottom:1rem;margin-top:1rem}.mr-8{margin-right:2rem}.mr-2{margin-right:.5rem}.-ml-1{margin-left:-.25rem}.ml-1{margin-left:.25rem}.ml-8{margin-left:2rem}.mt-2{margin-top:.5rem}.ml-16{margin-left:4rem}.mt-4{margin-top:1rem}.mb-4{margin-bottom:1rem}.ml-2{margin-left:.5rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.-mt-8{margin-top:-2rem}.mb-3{margin-bottom:.75rem}.inline-block{display:inline-block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-6{height:1.5rem}.h-8{height:2rem}.h-full{height:100%}.h-1\\/2{height:50%}.h-16{height:4rem}.min-h-screen{min-height:100vh}.w-6{width:1.5rem}.w-2{width:.5rem}.w-96{width:24rem}.w-full{width:100%}.w-8{width:2rem}.w-16{width:4rem}.w-10{width:2.5rem}.w-4{width:1rem}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.transform{transform:var(--tw-transform)}.cursor-pointer{cursor:pointer}.grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.justify-evenly{justify-content:space-evenly}.whitespace-nowrap{white-space:nowrap}.rounded-lg{border-radius:.5rem}.rounded-full{border-radius:9999px}.rounded-xl{border-radius:.75rem}.rounded-md{border-radius:.375rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.border-0{border-width:0}.border-2{border-width:2px}.border-l-2{border-left-width:2px}.border-l{border-left-width:1px}.border-b{border-bottom-width:1px}.border-gray-400{--tw-border-opacity:1;border-color:rgba(156,163,175,var(--tw-border-opacity))}.bg-grey-700{--tw-bg-opacity:1;background-color:rgba(74,85,104,var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.bg-red-500{--tw-bg-opacity:1;background-color:rgba(245,101,101,var(--tw-bg-opacity))}.bg-grey-500{--tw-bg-opacity:1;background-color:rgba(160,174,192,var(--tw-bg-opacity))}.bg-gray-600{--tw-bg-opacity:1;background-color:rgba(75,85,99,var(--tw-bg-opacity))}.bg-gradient-to-t{background-image:linear-gradient(to top,var(--tw-gradient-stops))}.from-green-700{--tw-gradient-from:#2f855a;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,rgba(47,133,90,0))}.via-gray-800{--tw-gradient-stops:var(--tw-gradient-from),#1f2937,var(--tw-gradient-to,rgba(31,41,55,0))}.to-gray-800{--tw-gradient-to:#1f2937}.p-8{padding:2rem}.p-1{padding:.25rem}.py-6{padding-bottom:1.5rem;padding-top:1.5rem}.py-4{padding-bottom:1rem;padding-top:1rem}.px-20{padding-left:5rem;padding-right:5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-16{padding-bottom:4rem;padding-top:4rem}.px-8{padding-left:2rem;padding-right:2rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.px-16{padding-left:4rem;padding-right:4rem}.px-2{padding-left:.5rem;padding-right:.5rem}.pt-28{padding-top:7rem}.pt-12{padding-top:3rem}.pb-32{padding-bottom:8rem}.pb-12{padding-bottom:3rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-5xl{font-size:3rem;line-height:1}.text-sm{font-size:.875rem}.text-xl{font-size:1.25rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-lg{font-size:1.125rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.font-medium{font-weight:500}.font-semibold{font-weight:600}.italic{font-style:italic}.leading-6{line-height:1.5rem}.tracking-tighter{letter-spacing:-.05em}.tracking-normal{letter-spacing:0}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)}.shadow-lg,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}.transition{transition-duration:.15s;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-500{transition-duration:.5s}.hover\\:border-b-2:hover{border-bottom-width:2px}.hover\\:no-underline:hover{text-decoration:none}.hover\\:shadow-2xl:hover{--tw-shadow:0 25px 50px -12px rgba(0,0,0,0.25);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.dark .dark\\:border-gray-400{--tw-border-opacity:1;border-color:rgba(156,163,175,var(--tw-border-opacity))}.dark .dark\\:bg-black-100{--tw-bg-opacity:1;background-color:rgba(27,27,28,var(--tw-bg-opacity))}.dark .dark\\:bg-black-200{--tw-bg-opacity:1;background-color:rgba(12,12,13,var(--tw-bg-opacity))}.dark .dark\\:bg-gray-400{--tw-bg-opacity:1;background-color:rgba(156,163,175,var(--tw-bg-opacity))}.dark .dark\\:text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.dark .dark\\:text-gray-400{--tw-text-opacity:1;color:rgba(156,163,175,var(--tw-text-opacity))}.dark .dark\\:text-gray-300{--tw-text-opacity:1;color:rgba(209,213,219,var(--tw-text-opacity))}.dark .dark\\:text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}.dark .dark\\:text-opacity-60{--tw-text-opacity:0.6}@media (min-width:640px){.sm\\:overflow-hidden{overflow:hidden}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:py-24{padding-bottom:6rem;padding-top:6rem}}@media (min-width:1024px){.lg\\:py-32{padding-bottom:8rem;padding-top:8rem}.lg\\:px-8{padding-left:2rem;padding-right:2rem}}';
const DesktopNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"text-green"}">DesktopNav
</div>`;
});
const MobileNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>MobileNav
</div>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav>${validate_component(DesktopNav, "DesktopNav").$$render($$result, {}, {}, {})}
    ${validate_component(MobileNav, "MobileNav").$$render($$result, {}, {}, {})}</nav>`;
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
const Discord = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    { "data-icon": "discord" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 448 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"}"></path></svg>`;
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
const Facebook = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    { "data-icon": "facebook-square" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 448 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"}"></path></svg>`;
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
const Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    { "data-icon": "twitter-square" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 448 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"}"></path></svg>`;
});
const Youtube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    { "data-icon": "youtube" },
    { class: escape_attribute_value(classes) },
    { xmlns: "http://www.w3.org/2000/svg" },
    { viewBox: "0 0 576 512" }
  ])}><path${add_attribute("fill", iconColor, 0)} d="${"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"}"></path></svg>`;
});
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "" } = $$props;
  let { classes = "" } = $$props;
  let { accessibilityProps = void 0 } = $$props;
  let { color = "" } = $$props;
  let iconColor;
  if (!name) {
    name = null;
  }
  switch (color) {
    case "white":
      iconColor = "#ffffff";
      break;
    case "primary":
      iconColor = "#76CAE3";
      break;
    default:
      iconColor = "#000000";
  }
  const iconMap = {
    cheveronRight: Chevron_right,
    discord: Discord,
    facebook: Facebook,
    instagram: Instagram,
    options: Dots_vertical,
    search: Search,
    twitter: Twitter,
    youtube: Youtube
  };
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.accessibilityProps === void 0 && $$bindings.accessibilityProps && accessibilityProps !== void 0)
    $$bindings.accessibilityProps(accessibilityProps);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `${validate_component(iconMap[name] || null || missing_component, "svelte:component").$$render($$result, { classes, accessibilityProps, iconColor }, {}, {})}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes } = $$props;
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  return `<button type="${"button"}"${add_attribute("class", classes, 0)}>${slots.default ? slots.default({}) : ``}</button>`;
});
function isExternal(path) {
  return /^http/.test(path);
}
const AddLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { to = "" } = $$props;
  let { target = "" } = $$props;
  let { rel = "" } = $$props;
  let { classes = "" } = $$props;
  let { onClick = void 0 } = $$props;
  const newWindowSrText = target && target === "_blank";
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.rel === void 0 && $$bindings.rel && rel !== void 0)
    $$bindings.rel(rel);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  return `${!to || !to.length ? `${onClick ? `<button${add_attribute("class", classes, 0)}>fddfdf${slots.default ? slots.default({}) : ``}</button>` : `<div${add_attribute("class", classes, 0)}${add_attribute("target", target, 0)}${add_attribute("rel", rel, 0)}>${slots.default ? slots.default({}) : ``}</div>`}` : ``}

${isExternal(to) && newWindowSrText ? `<a${add_attribute("href", to, 0)}${add_attribute("target", target, 0)}${add_attribute("rel", rel, 0)}${add_attribute("class", classes, 0)}>${slots.default ? slots.default({}) : ``}
		${escape(newWindowSrText)}</a>` : ``}
<a${add_attribute("href", to, 0)}${add_attribute("target", target, 0)}${add_attribute("rel", rel, 0)}${add_attribute("class", classes, 0)}>${slots.default ? slots.default({}) : ``}</a>`;
});
const borderClasses = "ml-8 text-left border-l-2 dark:border-gray-400";
const headerClasses = "dark:text-white dark:text-opacity-60";
const learnMoreClasses = "mt-2 tracking-tighter";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const socials = [
    { href: "/", name: "Twitter" },
    { href: "/", name: "Instagram" },
    { href: "/", name: "Facebook" },
    { href: "/", name: "Youtube" }
  ];
  return `<footer class="${"dark:bg-black-100 py-4 px-20 text-center"}"><div class="${"grid grid-cols-5"}"><div class="${"grid-cols-4"}"><div class="${"grid grid-cols-2"}"><div class="${"text-left dark:text-white"}"><div${add_attribute("class", headerClasses, 0)}>LEARN MORE</div>
					<div${add_attribute("class", learnMoreClasses, 0)}>FAQ</div>
					<div${add_attribute("class", learnMoreClasses, 0)}>Documentation</div>
					<div${add_attribute("class", learnMoreClasses, 0)}>Terms and Conditions</div>
					<div${add_attribute("class", learnMoreClasses, 0)}>Privacy Policy</div></div>
				<div class="${"ml-16 text-left dark:text-white"}"><br>
					<div${add_attribute("class", learnMoreClasses, 0)}>Our Team</div>
					<div${add_attribute("class", learnMoreClasses, 0)}>Contact Us</div></div></div></div>
		
		<div></div>
		<div class="${"text-left"}"><div${add_attribute("class", headerClasses, 0)}>JOIN OUR DISCORD!</div>
			<div class="${"flex my-4"}">${validate_component(Icon, "Icon").$$render($$result, {
    name: "discord",
    classes: "flex items-center mr-8 w-96",
    color: "primary"
  }, {}, {})}
				<div class="${"text-sm dark:text-white"}">Our Discord server is a great place to meet the team, chat with us and become
					part of an exciting and rapidly growing community.
				</div></div>
			${validate_component(Button, "Button").$$render($$result, {
    classes: "mt-4 px-4 py-2 w-full bg-grey-700 text-white rounded-full text-sm"
  }, {}, { default: () => `Join our Discord` })}</div>
		<div${add_attribute("class", borderClasses, 0)}><div class="${"ml-16"}"><div${add_attribute("class", headerClasses, 0)}>JOIN OUR MAILING LIST</div>
				<div class="${"my-4 text-white"}">Join our mailing list to get updates on new features and exclusive offers.
				</div>
				<input placeholder="${"Enter your email..."}" class="${"mb-4 px-4 py-1 border-0 rounded-full w-full dark:bg-black-200 dark:text-white"}"><br>
				${validate_component(Button, "Button").$$render($$result, {
    classes: "px-4 py-2 w-full bg-grey-700 rounded-full dark:text-white"
  }, {}, { default: () => `Sign Up` })}</div></div>
		<div${add_attribute("class", borderClasses, 0)}><div class="${"ml-16"}"><div${add_attribute("class", headerClasses, 0)}>FOLLOW US</div>
				<ul>${each(socials, (social) => `<li class="${"mt-4"}">${validate_component(AddLink, "AddLink").$$render($$result, {
    to: social.href,
    classes: "text-white flex items-center ml-2",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => `${validate_component(Icon, "Icon").$$render($$result, {
      name: social.name.toLowerCase(),
      classes: "w-8 h-8",
      color: "primary"
    }, {}, {})}
								<span class="${"ml-4"}">${escape(social.name)}</span>
							`
  })}
						</li>`)}</ul></div></div></div>
	<div class="${"mt-8 text-center dark:text-white"}">Endeavors.tv All rights reserved.</div></footer>`;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main${add_attribute("class", "", 0)}>
	${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
	<div class="${"min-h-screen"}">${slots.default ? slots.default({}) : ``}</div>
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
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content = "" } = $$props;
  let { title = "" } = $$props;
  let { alt = "" } = $$props;
  let { imgSrc = "" } = $$props;
  let { imgClasses = "" } = $$props;
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
  return `${imgSrc ? `${validate_component(Image, "Image").$$render($$result, { classes: imgClasses, src: imgSrc, alt }, {}, {})}` : ``}
<div class="${"py-4 px-8"}">${title ? `<div class="${"mt-2 text-2xl text-homePrimary"}">${escape(title)}</div>` : ``}
	${content ? `<p class="${"py-3 dark:text-white leading-6"}">${escape(content)}</p>` : ``}</div>`;
});
var index_svelte_svelte_type_style_lang = ".top-home-container.svelte-88s9g3{background:transparent linear-gradient(180deg,#0088b1,#000) 0 0 no-repeat padding-box}.bottom-home-container.svelte-88s9g3{background:transparent linear-gradient(180deg,#000,#0088b1) 0 0 no-repeat padding-box}";
const css = {
  code: ".top-home-container.svelte-88s9g3{background:transparent linear-gradient(180deg,#0088b1,#000) 0 0 no-repeat padding-box}.bottom-home-container.svelte-88s9g3{background:transparent linear-gradient(180deg,#000,#0088b1) 0 0 no-repeat padding-box}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\">export const prerender = true;\\n<\/script>\\r\\n\\r\\n<script lang=\\"ts\\">import Card from '../components/UI/Card/Card.svelte';\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>Home</title>\\r\\n</svelte:head>\\r\\n\\r\\n<div>\\r\\n\\t<div class=\\"text-center\\">\\r\\n\\t\\t<div class=\\"top-home-container\\">\\r\\n\\t\\t\\t<div class=\\"pt-28\\">\\r\\n\\t\\t\\t\\t<h1 class=\\"text-homeHeaderColor text-5xl\\">\\r\\n\\t\\t\\t\\t\\tReady for <span class=\\"dark:text-white\\">something different?</span>\\r\\n\\t\\t\\t\\t</h1>\\r\\n\\t\\t\\t\\t<div class=\\"dark:text-white pt-12 pb-32\\" style=\\"margin: 0em 20em;\\">\\r\\n\\t\\t\\t\\t\\tEndeavors.tv is a platform that is <b\\r\\n\\t\\t\\t\\t\\t\\t>changing the status quo of livestreaming.</b\\r\\n\\t\\t\\t\\t\\t> Forget waiting months or years, hoping to get noticed: just hop on, stream your\\r\\n\\t\\t\\t\\t\\tgames and instantly get all eyes on you. Sign your team up to a competitive or casual\\r\\n\\t\\t\\t\\t\\tleague. Participate in tournaments. Join a groundbreaking, rapidly growing community\\r\\n\\t\\t\\t\\t\\tof other gamers and streamers like yourself.\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\"bottom-home-container\\">\\r\\n\\t\\t\\t<div class=\\"flex mx-16\\">\\r\\n\\t\\t\\t\\t<div class=\\"mr-8 flex-1 rounded-lg dark:bg-darkPrimary\\">\\r\\n\\t\\t\\t\\t\\t<Card\\r\\n\\t\\t\\t\\t\\t\\timgSrc=\\"https://images.unsplash.com/photo-1622495894307-93143fc57155\\"\\r\\n\\t\\t\\t\\t\\t\\timgClasses=\\"rounded-t-lg\\"\\r\\n\\t\\t\\t\\t\\t\\talt=\\"\\"\\r\\n\\t\\t\\t\\t\\t\\ttitle=\\"Grow your audience.\\"\\r\\n\\t\\t\\t\\t\\t\\tcontent=\\"Our platform is designed to help hungry streamers grow their audience. Forget waiting for your big break - with our KOTH league model, you can use your gaming prowess to win eyeballs.\\"\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"mr-8 flex-1 rounded-lg dark:bg-darkPrimary\\">\\r\\n\\t\\t\\t\\t\\t<Card\\r\\n\\t\\t\\t\\t\\t\\timgSrc=\\"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80\\"\\r\\n\\t\\t\\t\\t\\t\\timgClasses=\\"rounded-t-lg\\"\\r\\n\\t\\t\\t\\t\\t\\talt=\\"\\"\\r\\n\\t\\t\\t\\t\\t\\ttitle=\\"Showcase your talent.\\"\\r\\n\\t\\t\\t\\t\\t\\tcontent=\\"If you're a standout, we'll help you get noticed. Talented streamers, skilled gamers, high-performing teams and trending leagues are launched to the top of the charts in our Freestyle section.\\"\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"mr-8 flex-1 rounded-lg dark:bg-darkPrimary\\">\\r\\n\\t\\t\\t\\t\\t<Card\\r\\n\\t\\t\\t\\t\\t\\timgSrc=\\"https://images.unsplash.com/photo-1622495894307-93143fc57155\\"\\r\\n\\t\\t\\t\\t\\t\\timgClasses=\\"rounded-t-lg\\"\\r\\n\\t\\t\\t\\t\\t\\talt=\\"\\"\\r\\n\\t\\t\\t\\t\\t\\ttitle=\\"Find your tribe.\\"\\r\\n\\t\\t\\t\\t\\t\\tcontent=\\"Our platform is built by gamers, for gamers. Whatever content you're into, our robust Community search tools can help you find people who are on the same page. What you do from there is up to you!\\"\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<div class=\\"mr-8 flex-1 rounded-lg dark:bg-darkPrimary\\">\\r\\n\\t\\t\\t\\t\\t<Card\\r\\n\\t\\t\\t\\t\\t\\timgSrc=\\"https://images.unsplash.com/photo-1622495894307-93143fc57155\\"\\r\\n\\t\\t\\t\\t\\t\\timgClasses=\\"rounded-t-lg\\"\\r\\n\\t\\t\\t\\t\\t\\talt=\\"\\"\\r\\n\\t\\t\\t\\t\\t\\ttitle=\\"Play your way.\\"\\r\\n\\t\\t\\t\\t\\t\\tcontent=\\"Whether you prefer solo adventures or high-stakes competitions, we've got you covered. With our advanced team and leauge management tools, you can game whenever you want, however you want.\\"\\r\\n\\t\\t\\t\\t\\t/>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>.top-home-container{background:transparent linear-gradient(180deg,#0088b1,#000) 0 0 no-repeat padding-box}.bottom-home-container{background:transparent linear-gradient(180deg,#000,#0088b1) 0 0 no-repeat padding-box}</style>\\r\\n"],"names":[],"mappings":"AAsEO,iCAAmB,CAAC,WAAW,WAAW,CAAC,gBAAgB,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC,WAAW,CAAC,oCAAsB,CAAC,WAAW,WAAW,CAAC,gBAAgB,MAAM,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC,WAAW,CAAC"}`
};
const prerender = true;
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}`, ""}

<div><div class="${"text-center"}"><div class="${"top-home-container svelte-88s9g3"}"><div class="${"pt-28"}"><h1 class="${"text-homeHeaderColor text-5xl"}">Ready for <span class="${"dark:text-white"}">something different?</span></h1>
				<div class="${"dark:text-white pt-12 pb-32"}" style="${"margin: 0em 20em;"}">Endeavors.tv is a platform that is <b>changing the status quo of livestreaming.</b> Forget waiting months or years, hoping to get noticed: just hop on, stream your
					games and instantly get all eyes on you. Sign your team up to a competitive or casual
					league. Participate in tournaments. Join a groundbreaking, rapidly growing community
					of other gamers and streamers like yourself.
				</div></div></div>
		<div class="${"bottom-home-container svelte-88s9g3"}"><div class="${"flex mx-16"}"><div class="${"mr-8 flex-1 rounded-lg dark:bg-darkPrimary"}">${validate_component(Card, "Card").$$render($$result, {
    imgSrc: "https://images.unsplash.com/photo-1622495894307-93143fc57155",
    imgClasses: "rounded-t-lg",
    alt: "",
    title: "Grow your audience.",
    content: "Our platform is designed to help hungry streamers grow their audience. Forget waiting for your big break - with our KOTH league model, you can use your gaming prowess to win eyeballs."
  }, {}, {})}</div>
				<div class="${"mr-8 flex-1 rounded-lg dark:bg-darkPrimary"}">${validate_component(Card, "Card").$$render($$result, {
    imgSrc: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
    imgClasses: "rounded-t-lg",
    alt: "",
    title: "Showcase your talent.",
    content: "If you're a standout, we'll help you get noticed. Talented streamers, skilled gamers, high-performing teams and trending leagues are launched to the top of the charts in our Freestyle section."
  }, {}, {})}</div>
				<div class="${"mr-8 flex-1 rounded-lg dark:bg-darkPrimary"}">${validate_component(Card, "Card").$$render($$result, {
    imgSrc: "https://images.unsplash.com/photo-1622495894307-93143fc57155",
    imgClasses: "rounded-t-lg",
    alt: "",
    title: "Find your tribe.",
    content: "Our platform is built by gamers, for gamers. Whatever content you're into, our robust Community search tools can help you find people who are on the same page. What you do from there is up to you!"
  }, {}, {})}</div>
				<div class="${"mr-8 flex-1 rounded-lg dark:bg-darkPrimary"}">${validate_component(Card, "Card").$$render($$result, {
    imgSrc: "https://images.unsplash.com/photo-1622495894307-93143fc57155",
    imgClasses: "rounded-t-lg",
    alt: "",
    title: "Play your way.",
    content: "Whether you prefer solo adventures or high-stakes competitions, we've got you covered. With our advanced team and leauge management tools, you can game whenever you want, however you want."
  }, {}, {})}</div></div></div></div>
</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  prerender
});
export { init, render };
