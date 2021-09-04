<script lang="ts">
	import Icon from '../../Icon/Icon.svelte'

	function toggleLeagueOptions() {
		console.log('enter')
	}
</script>

<button on:click={toggleLeagueOptions} class="px-2" aria-label="more league options">
	<Icon name="options" color="white" classes="w-2 cursor-pointer" />
</button>
