<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let defaultStyles = ''
	export let circle = false
	export let alt = ''
	export let classes = ''
	export let src = ''
	export let style = ''

	const dispatch = createEventDispatcher()

	function dispatchAction() {
		dispatch('action')
	}

	defaultStyles = circle ? 'rounded-full border-2 p-1' : ''
</script>

<img
	on:click={dispatchAction}
	{src}
	class={`inline-block max-w-full ${defaultStyles} m-auto ${classes}`}
	{style}
	{alt}
/>
