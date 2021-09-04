<script lang="ts">
	import Breadcrumb from './Breadcrumb.svelte'

	export let crumbs = []
</script>

{#if crumbs}
	<nav aria-label="Breadcrumbs for page" class="py-6 pb-12">
		<ul class="flex items-center text-sm">
			{#each crumbs as crumb, i}
				<Breadcrumb {crumb} lastCrumb={i + 1 >= crumbs.length} />
			{/each}
		</ul>
	</nav>
{/if}
