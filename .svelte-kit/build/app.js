import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "../../src/hooks.ts";

const template = ({ head, body }) => "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\t<head>\r\n\t\t<meta charset=\"utf-8\" />\r\n\t\t<link rel=\"icon\" href=\"/Images/DH.svg\" />\r\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css\">\r\n\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n\t\t<meta name=\"description\" content=\"Welcome to my portfolio where you can see my latest projects, resume, and even contact me\"/>\r\n\t\t<title>David M. Hanlon</title>\r\n\t\t" + head + "\r\n\t</head>\r\n\t<body>\r\n\t\t<div id=\"svelte\" class=\"app\">" + body + "</div>\r\n\t</body>\r\n</html>\r\n\r\n<style>\r\n\t/* attempting to remove focus on mouse click but keep for tab*/\r\n\t.app:focus:not(:focus-visible){\r\n\t\toutline: none;\r\n\t}\r\n</style>";

let options = null;

const default_settings = { paths: {"base":"","assets":""} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	const hooks = get_hooks(user_hooks);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-54e41665.js",
			css: [assets + "/_app/assets/start-464e9d0a.css"],
			js: [assets + "/_app/start-54e41665.js",assets + "/_app/chunks/vendor-1fde8790.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => assets + "/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: (error, request) => {
			hooks.handleError({ error, request });
			error.stack = options.get_stack(error);
		},
		hooks,
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

// input has already been decoded by decodeURI
// now handle the rest that decodeURIComponent would do
const d = s => s
	.replace(/%23/g, '#')
	.replace(/%3[Bb]/g, ';')
	.replace(/%2[Cc]/g, ',')
	.replace(/%2[Ff]/g, '/')
	.replace(/%3[Ff]/g, '?')
	.replace(/%3[Aa]/g, ':')
	.replace(/%40/g, '@')
	.replace(/%26/g, '&')
	.replace(/%3[Dd]/g, '=')
	.replace(/%2[Bb]/g, '+')
	.replace(/%24/g, '$');

const empty = () => ({});

const manifest = {
	assets: [{"file":".DS_Store","size":8196,"type":null},{"file":"Images/.DS_Store","size":8196,"type":null},{"file":"Images/A.svg","size":2971,"type":"image/svg+xml"},{"file":"Images/B.svg","size":3258,"type":"image/svg+xml"},{"file":"Images/DH.png","size":4890,"type":"image/png"},{"file":"Images/DH.svg","size":2062,"type":"image/svg+xml"},{"file":"Images/chatApp.png","size":539642,"type":"image/png"},{"file":"Images/chatAppCardImg.webp","size":181838,"type":"image/webp"},{"file":"Images/computerBg.jpg","size":1783504,"type":"image/jpeg"},{"file":"Images/cybrary1.png","size":3727,"type":"image/png"},{"file":"Images/cybrary2.png","size":2850,"type":"image/png"},{"file":"Images/cybrary3.png","size":2641,"type":"image/png"},{"file":"Images/davidHanlon.jpg","size":396379,"type":"image/jpeg"},{"file":"Images/davidHanlon.svg","size":2720,"type":"image/svg+xml"},{"file":"Images/davidHanlon.webp","size":183128,"type":"image/webp"},{"file":"Images/educationClipArt.jpg","size":30319,"type":"image/jpeg"},{"file":"Images/endeavorsTvCardImg.webp","size":403648,"type":"image/webp"},{"file":"Images/etsLogo.png","size":5095,"type":"image/png"},{"file":"Images/expenseTrackerCardImg.webp","size":9772,"type":"image/webp"},{"file":"Images/hero.svg","size":21478,"type":"image/svg+xml"},{"file":"Images/loveCalc.png","size":79869,"type":"image/png"},{"file":"Images/loveCalcCardImg.webp","size":11902,"type":"image/webp"},{"file":"Images/minionClipArt.jpeg","size":8286,"type":"image/jpeg"},{"file":"Images/needToEdit.png","size":895291,"type":"image/png"},{"file":"Images/nextJsCardImg.webp","size":63146,"type":"image/webp"},{"file":"Images/originalPortfolioCardImg.webp","size":41912,"type":"image/webp"},{"file":"Images/phsLogo.jpeg","size":238136,"type":"image/jpeg"},{"file":"Images/pinokioClipArt.png","size":13702,"type":"image/png"},{"file":"Images/profilePic.png","size":274937,"type":"image/png"},{"file":"Images/projectImages/Screen Shot 2021-09-20 at 8.36.03 PM.png","size":628963,"type":"image/png"},{"file":"Images/projectImages/Screen Shot 2021-09-20 at 8.36.29 PM.png","size":864248,"type":"image/png"},{"file":"Images/projectImages/Screen Shot 2021-09-20 at 8.36.55 PM.png","size":501810,"type":"image/png"},{"file":"Images/projectImages/Screen Shot 2021-09-20 at 8.37.20 PM.png","size":596027,"type":"image/png"},{"file":"Images/projectImages/Screen Shot 2021-09-22 at 1.34.59 PM.png","size":1021027,"type":"image/png"},{"file":"Images/projectImages/chatAppProject.webp","size":60196,"type":"image/webp"},{"file":"Images/projectImages/davidHPortfolio.webp","size":110902,"type":"image/webp"},{"file":"Images/projectImages/expenseTrackerProject.webp","size":10606,"type":"image/webp"},{"file":"Images/projectImages/loveCalculatorProject.webp","size":28630,"type":"image/webp"},{"file":"Images/projectImages/nextJsProject.webp","size":60784,"type":"image/webp"},{"file":"Images/projectImages/sleeplessGamersProject.webp","size":203294,"type":"image/webp"},{"file":"Images/sbdLogo.jpg","size":9598,"type":"image/jpeg"},{"file":"Images/softEngClip.jpg","size":41213,"type":"image/jpeg"},{"file":"Images/softEngClip2.png","size":39138,"type":"image/png"},{"file":"Images/sproutLogo1.png","size":2623,"type":"image/png"},{"file":"Images/sproutLogo2.png","size":8881,"type":"image/png"},{"file":"Images/towsonLogo1.png","size":8929,"type":"image/png"},{"file":"Images/towsonLogo2.jpeg","size":4179,"type":"image/jpeg"},{"file":"Images/work1ClipArt.png","size":2708,"type":"image/png"},{"file":"Images/wthsLogo1.jpg","size":519344,"type":"image/jpeg"},{"file":"Resume/.DS_Store","size":6148,"type":null},{"file":"Resume/DavidHanlonResume.pdf","size":69402,"type":"application/pdf"},{"file":"favicon.ico","size":1150,"type":"image/vnd.microsoft.icon"},{"file":"robots.txt","size":70,"type":"text/plain"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/blockchain\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/blockchain.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/experience\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/experience.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/projects\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/projects.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/contact\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/contact.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/skills\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/skills.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/about\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	externalFetch: hooks.externalFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/blockchain.svelte": () => import("../../src/routes/blockchain.svelte"),"src/routes/experience.svelte": () => import("../../src/routes/experience.svelte"),"src/routes/projects.svelte": () => import("../../src/routes/projects.svelte"),"src/routes/contact.svelte": () => import("../../src/routes/contact.svelte"),"src/routes/skills.svelte": () => import("../../src/routes/skills.svelte"),"src/routes/about.svelte": () => import("../../src/routes/about.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-a40e801f.js","css":["assets/pages/__layout.svelte-34d3cd38.css"],"js":["pages/__layout.svelte-a40e801f.js","chunks/vendor-1fde8790.js","chunks/Button-1519a163.js","chunks/Icon-edd10b00.js","chunks/store-9984b785.js","chunks/github-2090236b.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"error.svelte-5a21b326.js","css":[],"js":["error.svelte-5a21b326.js","chunks/vendor-1fde8790.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-d51d084d.js","css":[],"js":["pages/index.svelte-d51d084d.js","chunks/vendor-1fde8790.js","chunks/Image-0cdebd8d.js","chunks/Button-1519a163.js","chunks/Icon-edd10b00.js","chunks/github-2090236b.js","chunks/Container-7e014be9.js","chunks/store-9984b785.js","chunks/Divider-e478375d.js"],"styles":[]},"src/routes/blockchain.svelte":{"entry":"pages/blockchain.svelte-8179f549.js","css":[],"js":["pages/blockchain.svelte-8179f549.js","chunks/vendor-1fde8790.js","chunks/Container-7e014be9.js"],"styles":[]},"src/routes/experience.svelte":{"entry":"pages/experience.svelte-d0d25ce1.js","css":[],"js":["pages/experience.svelte-d0d25ce1.js","chunks/vendor-1fde8790.js","chunks/Container-7e014be9.js","chunks/Image-0cdebd8d.js","chunks/Icon-edd10b00.js","chunks/Divider-e478375d.js"],"styles":[]},"src/routes/projects.svelte":{"entry":"pages/projects.svelte-a0d8a9e0.js","css":[],"js":["pages/projects.svelte-a0d8a9e0.js","chunks/vendor-1fde8790.js","chunks/Container-7e014be9.js","chunks/Icon-edd10b00.js","chunks/Divider-e478375d.js","chunks/Button-1519a163.js","chunks/Image-0cdebd8d.js"],"styles":[]},"src/routes/contact.svelte":{"entry":"pages/contact.svelte-1c712a1d.js","css":["assets/pages/contact.svelte-f7c9e558.css"],"js":["pages/contact.svelte-1c712a1d.js","chunks/vendor-1fde8790.js","chunks/store-9984b785.js","chunks/Button-1519a163.js","chunks/Icon-edd10b00.js","chunks/Container-7e014be9.js"],"styles":[]},"src/routes/skills.svelte":{"entry":"pages/skills.svelte-8ae72f3a.js","css":[],"js":["pages/skills.svelte-8ae72f3a.js","chunks/vendor-1fde8790.js","chunks/Container-7e014be9.js"],"styles":[]},"src/routes/about.svelte":{"entry":"pages/about.svelte-f55667d7.js","css":[],"js":["pages/about.svelte-f55667d7.js","chunks/vendor-1fde8790.js","chunks/Image-0cdebd8d.js","chunks/Container-7e014be9.js","chunks/Button-1519a163.js","chunks/Icon-edd10b00.js"],"styles":[]}};

async function load_component(file) {
	const { entry, css, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css.map(dep => assets + "/_app/" + dep),
		js: js.map(dep => assets + "/_app/" + dep),
		styles
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}