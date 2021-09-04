<script lang="ts">
	import Icon from '../../Icon/Icon.svelte'

	export let value = ''
	export let classes = ''
	export let icon = ''

	const additionalClasses = `px-4 py-1 text-white rounded-md  text-sm ${icon ? 'flex' : ''} `
</script>

<div class={additionalClasses + classes}>
	{#if icon}
		<Icon name={icon} classes="w-4 text-left mr-2" color="white" />
	{/if}
	{value}
</div>
