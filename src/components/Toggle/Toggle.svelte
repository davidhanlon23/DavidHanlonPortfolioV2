<script lang="ts">
	import Toggle from 'svelte-toggle'
	export let onToggle = undefined;
	export let label = '';
</script>

<Toggle
	hideLabel
	label={label}
	switchColor="#eee"
	toggledColor="#24a148"
	untoggledColor="#fa4d56"
	on:toggle={onToggle}
/>
