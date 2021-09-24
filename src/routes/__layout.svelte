<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/Navbar/Navbar.svelte'
	import Footer from '../components/Footer/Footer.svelte'
	import { theme } from '../stores/store';

  	$: isDarkMode = $theme === 'dark' ? true : false;
</script>

<main class={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
	<Navbar className="bg-dh-primary-500 dark:bg-dh-primary-dark-500" />
	<div class="min-h-screen bg-dh-primary-500 dark:bg-dh-primary-dark-500">
		<slot />
	</div>
	<Footer />
</main>