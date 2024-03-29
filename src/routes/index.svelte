<script context="module" lang="ts">
	export const prerender = true;

</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';
	import Button from '../components/UI/Button/Button.svelte';
	import ProjectCard from '../components/UI/Card/ProjectCard.svelte';
	import Container from '../components/UI/Container/Container.svelte';
	import HomeHeroFooter from '../components/Home/HomeHeroFooter.svelte';
	import Divider from '../components/UI/Divider/Divider.svelte';
	import Image from '../components/UI/Image/Image.svelte';

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
						window.open('/Resume/DavidHanlonResume.pdf');
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
<Hero heroObject={heroObject} backgroundColor="bg-white dark:bg-dh-primary-dark-500" backgroundHeight="100" />
<div class="w-full mx-0 my-8 bg-dh-secondary-dark-500 rounded-t-3xl min-h-screen">
	<div class="pt-36 pb-8 sm:pb-12 md:pb-8 mx-4 md:mx-12 lg:mx-16 xl:mx-96">
		<div class="flex justify-center my-4">
			<Image classes="w-48 h-48 border-none" src="/Images/davidHanlon.webp" alt="Image of Me (David Hanlon)" circle />
		</div>
		<h3 class="text-center text-2xl sm:text-4xl font-bold text-white dark:text-black pb-4">Hi, I’m David. Nice to meet you.</h3>
		  <p class="text-center text-xl text-white dark:text-black"> Since beginning my journey as an Entrepreneur and Software Engineer, I have helped build some amazing projects and collaborated with talented people to create digital products 
			for both business and consumer use. My unique skill set goes much deeper then just developing.
			   I have worked at a Start Up for over the past 2 years, built multiple E-commerce businesses, ran digital and social media advertising (Instagram, Facebook, Snapchat, and Google AdWords), 
			   and have helped many clients turn their website into their central hub for their business through the likes of SaaS solutions such as Wix, and Shopify.
			   I'm naturally curious, and perpetually working on improving my skills trying to solve one problem with the help of technology at a time.
		  </p>
	</div>
</div>
<Container className="min-h-screen">
	<h3 class="text-center text-2xl sm:text-4xl font-bold pb-4 text-dh-secondary-dark-500">My Recent Work</h3>
	<p class="text-lg sm:text-xl text-center text-black dark:text-white" >Here are a few design projects I've worked on recently that I can talk about. Want to see more?
		<a href="mailto:davidhanlon23@gmail.com" class="text-dh-secondary-dark-500 hover:no-underline">Email me</a> .
	</p>
	<div class="my-24 flex flex-col md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-2 md:gap-4">
		<ProjectCard classes="my-4" title="Leverage Trading Calculator" imgSrc="/Images/ltcHome.webp" projectLink="https://leveragetradingcalculator.com" repoLink="https://www.github.com/0xD4V1NC1/leverage-trading-calculator" content="Leverage Trading Calculator is a tool I built to help me estimate entry and exit points on leveraged crypto trades. It is built with React 18, NextJS, TailwindCSS v3, and TypeScript. This very simple project bolsters a perfect lighthouse score in all categories" />
		<ProjectCard classes="my-4" title="Expense Tracker" content="Mobile application for tracking expenses built with Angular and Ionic Hybrid Mobile App Framework" repoLink="https://github.com/davidhanlon23/ExpenseTracker" imgSrc="/Images/expenseTrackerCardImg.webp" />
		<ProjectCard classes="my-4" title="0xWF NFT Minting Site" content="0xWF NFT is a Web3.0 NFT minting dapp built on the polygon network with React 18, TailwindCSS V3, Solidity 0.8.4, Mocha Testing Framework, TypeScript and Storybook" projectLink="https://pl7yg-5aaaa-aaaad-qbwiq-cai.ic.fleek.co/" repoLink="https://github.com/0xD4V1NC1/nft-minting-site" imgSrc="/Images/0xwfnft.webp" />
		<ProjectCard classes="my-4" title="NextJS Social" content="Demo Social Media application built using Server Side Rendering framework NextJS, ReactJS, and ExpressJS" imgSrc="/Images/nextJsCardImg.webp" projectLink="https://next-js-social-media-app.herokuapp.com/" repoLink="https://github.com/davidhanlon23/nextJS-social-media-app" />
		<ProjectCard classes="my-4" title="Endeavors.tv" content="Due to legal reasons, I can not share the repository code or extensive details of this live streaming platform. It was built using Svelte and Rust" projectLink="https://Endeavors.tv" imgSrc="/Images/endeavorsTvCardImg.webp" />
		<ProjectCard classes="my-4" title="Chat App" content="Mobile group chat application built with Angular and Ionic Hybrid Mobile App framework" repoLink="https://github.com/davidhanlon23/ChatApp" imgSrc="/Images/chatAppCardImg.webp" />
	</div>
	<div class="flex justify-center my-24">
		<Button href="/projects" text="View More Projects" classes="w-full mx-auto sm:mx-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm sm:px-8 text-white bg-dh-secondary-dark-500 hover:bg-white dark:hover:bg-dh-primary-dark-500 hover:text-dh-secondary-dark-500 hover:border-dh-secondary-dark-500" />
	</div>
</Container>
<Divider marginTop="mt-8" marginBottom="mb-8" />
<Container>
	<h3 class="text-center text-2xl sm:text-4xl font-bold pb-4 text-dh-secondary-dark-500">Interested in collaborating or hiring me?</h3>
	<p class="text-lg sm:text-xl text-center text-black dark:text-white" >I’m always open to discussing product design work or partnership opportunities.</p>
	<div class="flex justify-center py-24">
		<Button classes="border-2 py-3 px-4 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black" text="Start a Conversation" href="/contact" />
	</div>
</Container>

