<script lang="ts">
	export let id = ''
	export let classes = ''
	export let required = false
	export let ariaDescribedBy = ''
	export let ariaLabel = ''
	export let options = []
	export let index = 0
	export const value = ''
	export let placeholder: string
</script>

<select
	bind:value={index}
	{id}
	class={classes}
	aria-label={ariaLabel}
	aria-required={required}
	aria-describedby={ariaDescribedBy}
>
	{#if placeholder}
		<option value="" disabled selected hidden>{placeholder}</option>
	{/if}
	{#each options as option, i}
		<option value={option.text}>{option.text}</option>
	{/each}
</select>
