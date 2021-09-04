<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/Navbar/Navbar.svelte'
	import Footer from '../components/Footer/Footer.svelte'

	let isDarkMode: boolean
</script>

<main class={isDarkMode ? 'dark' : ''}>
	<Navbar bind:isDarkMode />
	<div class="min-h-screen">
		<slot />
	</div>
	<Footer />
</main>
