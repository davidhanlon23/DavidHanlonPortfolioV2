<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/Navbar/Navbar.svelte'
	import Footer from '../components/Footer/Footer.svelte'
	import { isDarkMode } from '../stores/store';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('localStorage', localStorage.theme);
  });
</script>

<main class={`min-h-screen ${$isDarkMode ? 'dark' : ''}`}>
	<Navbar className="bg-dh-primary-500 dark:bg-dh-primary-dark-500" />
	<div class="min-h-screen bg-dh-primary-500 dark:bg-dh-primary-dark-500">
		<slot />
	</div>
	<Footer />
</main>