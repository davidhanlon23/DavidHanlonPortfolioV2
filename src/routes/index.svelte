<script context="module" lang="ts">
	export const prerender = true;

</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';
	import Button from '../components/UI/Button/Button.svelte';
	import Container from '../components/UI/Container/Container.svelte';
	import HomeHeroFooter from '../components/Home/HomeHeroFooter.svelte';
	import Divider from '../components/UI/Divider/Divider.svelte';
	
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
				text: 'Work With Me',
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
<div class="w-full mx-0 my-8 text-black dark:text-white bg-dh-secondary-dark-500 rounded-t-3xl h-screen">
	<div class="pt-36 mx-4 md:mx-12 lg:mx-16 xl:mx-96">
		<h3 class="text-center text-2xl sm:text-4xl font-bold text-black dark:text-white pb-4">Hi, I’m David. Nice to meet you.</h3>
		<p class="text-center text-xl text-black dark:text-white">Since beginning my journey as a freelance designer nearly 10 years ago,
		 I've done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products 
		 for both business and consumer use. I'm quietly confident, naturally curious, and perpetually working on improving my chops one
		  design problem at a time.</p>
	</div>
</div>
<Divider marginBottom="mb-8" />
<Container className="h-screen">
	<h3 class="text-center text-4xl font-bold pb-4 text-dh-secondary-dark-500">My Recent Work</h3>
	<p class="text-lg sm:text-xl text-center text-black dark:text-white" >Here are a few design projects I've worked on recently. Want to see more?
		<a href="mailto:davidhanlon23@gmail.com" class="text-dh-secondary-dark-500 hover:no-underline">Email me</a> .
	</p>
	<div>
		INSERT PROJECTS HERE
	</div>
	<Button href="/projects" text="View More Projects" classes="w-full mx-auto sm:mx-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm sm:px-8" color="primary" />
</Container>
<Divider marginTop="mt-8" />

