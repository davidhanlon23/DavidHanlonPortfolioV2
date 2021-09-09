<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/Navbar/Navbar.svelte'
	import Footer from '../components/Footer/Footer.svelte'
	import { isDarkMode } from '../stores/store';

	let toggleDarkMode: boolean

	isDarkMode.subscribe( data => {
		toggleDarkMode = data;
	});

</script>

<main class={toggleDarkMode ? 'dark' : ''}>
	<Navbar className="bg-dh-primary-500 dark:bg-dh-primary-dark-500" />
	<div class="min-h-screen bg-dh-primary-500 dark:bg-dh-primary-dark-500">
		<slot />
	</div>
	<Footer />
</main>
