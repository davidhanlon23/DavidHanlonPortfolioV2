<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Hero backgroundColor="bg-green-500" />