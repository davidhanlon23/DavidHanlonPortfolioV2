<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';
	import Container from '../components/UI/Container/Container.svelte';

	const backgroundImage = 'https://i.pinimg.com/originals/5d/ca/87/5dca87b6088664ae9fa8080986a58b4c.png';
  	const backgroundImageDescription = 'Hero Image Background';
	const heroObject = {
		primaryHeader: 'This Primary Header,',
		secondaryHeader: 'This is secondary header',
		subText: 'This is a bunch of subtext that should be somewhat important...klasf;lkasj;flkajf;lskjf;slkf',
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
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<Hero heroObject={heroObject} backgroundImage={backgroundImage} backgroundImageDescription={backgroundImageDescription} height="100" />
<Container className="w-full px-4 md:px-12 py-8 text-black dark:text-white">
	<div>Dummy data</div>
</Container>

