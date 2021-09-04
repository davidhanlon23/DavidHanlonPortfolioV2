<script lang="ts">
	export let modalValue = ''
	export let containerClasses = ''

	let open = false
</script>

<button class={`${containerClasses} trigger`} class:open on:click={() => (open = true)}>
	{modalValue}
</button>
{#if open}
	<div class="overlay" on:click={() => (open = false)} />
	<div class="modal">
		<slot />
		<div class="close" on:click={() => (open = false)}>✖</div>
	</div>
{/if}

<style>
	.modal {
		top: 50%;
		left: 50%;
		z-index: 3;
		padding: 50px;
		position: fixed;
		border-style: solid;
		overflow: hidden;
		transform: translate(-50%, -50%);
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
		padding: 5px;
		cursor: pointer;
	}
	.trigger.open {
		opacity: 0;
	}
</style>
