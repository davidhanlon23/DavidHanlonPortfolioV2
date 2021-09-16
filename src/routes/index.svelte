<script context="module" lang="ts">
	export const prerender = true;

</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';
	import Container from '../components/UI/Container/Container.svelte';
	import HomeHeroFooter from '../components/Home/HomeHeroFooter.svelte';
	
	const heroObject = {
		primaryHeader: 'Full Stack Engineer, Entrepreneur, & Blockchain Enthusiast',
		secondaryHeader: '',
		subText: 'Together lets change the world',
		cta: {
			primary: {
				text: 'Resume',
				color: 'primary',
				functionality: {
					onClick: () => {
						window.open('/static/Resume/DavidHanlonResume.pdf');
					},
				},
				accessibilityProps:{
					'aria-label': `Download David's Resume`,
				},
			},
			secondary: {
				text: 'Work with me',
				color: 'secondary',
				functionality: {
					href: '/contact',
				},
				accessibilityProps:{
					'aria-label': 'Link to contact page'
				},

			},
		},
		heroFooter: [
			{
				component: HomeHeroFooter,
			},
		],

	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<Hero heroObject={heroObject} backgroundColor="bg-white dark:bg-dh-primary-dark-500" heroHeight="screen" backgroundHeight="100" />
<div class="w-full mx-0 py-8 text-black dark:text-white bg-purple-500 rounded-t-3xl h-full">
	<h3 class="text-center text-2xl font-bold text-black dark:text-white">Hi, I’m David. Nice to meet you.</h3>
	<p class="text-center text-lg text-black dark:text-white">Since beginning my journey as a freelance designer nearly 10 years ago,
		 I've done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products 
		 for both business and consumer use. I'm quietly confident, naturally curious, and perpetually working on improving my chops one
		  design problem at a time.</p>
</div>
<Container className="bg-pink-400 h-screen">
	<p>Some more text</p>
</Container>

