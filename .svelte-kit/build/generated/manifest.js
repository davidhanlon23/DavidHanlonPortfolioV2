const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/blockchain.svelte"),
	() => import("../../../src/routes/experience.svelte"),
	() => import("../../../src/routes/projects.svelte"),
	() => import("../../../src/routes/contact.svelte"),
	() => import("../../../src/routes/skills.svelte"),
	() => import("../../../src/routes/about.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/blockchain.svelte
	[/^\/blockchain\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/experience.svelte
	[/^\/experience\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/projects.svelte
	[/^\/projects\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/contact.svelte
	[/^\/contact\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/skills.svelte
	[/^\/skills\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[8]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];