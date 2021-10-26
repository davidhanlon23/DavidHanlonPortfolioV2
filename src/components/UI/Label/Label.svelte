<script lang="ts">
	import Icon from '../Icon/Icon.svelte'

	export let value = ''
	export let classes = ''
	export let icon = ''

	const additionalClasses = `px-1.5 py-0.5 mx-2 text-xs text-white dark:text-black font-bold bg-dh-secondary-dark-500 rounded ${icon ? 'flex' : 'inline-block'} `
</script>

<div class={additionalClasses + classes}>
	{#if icon}
		<Icon name={icon} classes="w-4 text-left mr-2" color="white" />
	{/if}
	{value}
</div>
