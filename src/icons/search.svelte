<script lang="ts">
	export let classes = 'w-6 h-6'
	export let iconColor = 'none'
	export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' }
</script>

<svg
	class={classes}
	fill={iconColor}
	{...accessibilityProps}
	stroke="currentColor"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	><path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
	/></svg
>
