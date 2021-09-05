<script lang="ts">
	export let to = ''
	export let target = ''
	export let rel = ''
	export let classes = ''
	export let onClick = undefined
	const newWindowSrText = target && target === '_blank'

	function isExternal(path) {
		return /^http/.test(path)
	}
</script>

{#if !to || !to.length}
	{#if onClick}
		<button class={classes} on:click={onClick}>
			<slot />
		</button>
	{:else}
		<div class={classes} {target} {rel}>
			<slot />
		</div>
	{/if}
{/if}

{#if isExternal(to) && newWindowSrText}
	<a href={to} {target} {rel} class={classes}>
		<slot />
		{newWindowSrText}
	</a>
{/if}
<a href={to} {target} {rel} class={classes}>
	<slot />
</a>
