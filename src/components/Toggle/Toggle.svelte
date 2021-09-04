<script lang="ts">
	import Toggle from 'svelte-toggle'

	export let isDarkMode: boolean
</script>

<Toggle
	hideLabel
	label="Dark mode toggle"
	switchColor="#eee"
	toggledColor="#24a148"
	untoggledColor="#fa4d56"
	bind:toggled={isDarkMode}
/>
