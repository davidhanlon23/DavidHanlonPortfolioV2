<script lang="ts">
	import Icon from '../../components/Icon/Icon.svelte'

	export let crumb = null
	export let lastCrumb = false
</script>

<li class="inline-block mr-2">
	<a href={crumb.href} aria-current={`${lastCrumb ? 'page' : null}`} class="hover:no-underline">
		<Icon name="cheveronRight" color="white" classes="inline-block -ml-1 w-2" />
		<span class="ml-1 dark:text-gray-400">{crumb.label}</span>
	</a>
</li>
