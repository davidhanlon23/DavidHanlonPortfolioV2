<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/NavbarNew/Navbar.svelte'
	// import Navbar from '../components/navbar/navbarOld.svelte';
	import Footer from '../components/Footer/Footer.svelte'

	let isDarkMode: boolean
</script>

<main class={isDarkMode ? 'dark' : ''}>
	<!-- <Navbar bind:isDarkMode /> -->
	<Navbar className="bg-white dark:bg-black" bind:isDarkMode />
	<div class="min-h-screen">
		<slot />
	</div>
	<Footer />
</main>
