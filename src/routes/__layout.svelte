<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/NavbarNew/Navbar.svelte'
	// import Navbar from '../components/navbar/navbarOld.svelte';
	import Footer from '../components/Footer/Footer.svelte'
	// import { isDarkMode } from '../stores/store';
	let isDarkMode: boolean

	// function handleDarkMode(){
	// 	isDarkMode.update(n => true);

	// }
</script>

<main class={isDarkMode ? 'dark' : ''}>
	<!-- <Navbar bind:isDarkMode /> -->
	<Navbar className="bg-dh-primary-500 dark:bg-dh-primary-dark-500" bind:isDarkMode />
	<div class="min-h-screen bg-dh-primary-500 dark:bg-dh-primary-dark-500">
		<slot />
	</div>
	<Footer />
</main>
