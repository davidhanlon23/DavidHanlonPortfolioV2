<script lang="ts">
	import Toggle from 'svelte-toggle'
	export let onToggle = undefined;
	export let label = '';
	export let toggledColor = '';
	export let switchColor = '';
	export let untoggledColor = '';

</script>

<Toggle
	hideLabel
	label={label}
	switchColor={switchColor}
	toggledColor={toggledColor}
	untoggledColor={untoggledColor}
	on:toggle={onToggle}
/>
