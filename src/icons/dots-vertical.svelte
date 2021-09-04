<script lang="ts">
	export let classes = 'w-6 h-6'
	export let iconColor = 'none'
	export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' }
</script>

<svg
	{...accessibilityProps}
	data-prefix="fas"
	data-icon="ellipsis-v"
	class={classes}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 192 512"
	><path
		fill={iconColor}
		d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
	/></svg
>
