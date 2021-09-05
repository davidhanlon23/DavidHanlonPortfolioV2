<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';

	const backgroundImage = 'https://i.pinimg.com/originals/5d/ca/87/5dca87b6088664ae9fa8080986a58b4c.png';
  	const backgroundImageDescription = 'Hero Image Background';
	const heroObject = {
		primaryHeader: 'You bring the talent,',
		secondaryHeader: 'We bring the audience',
		subText: 'Sleepless Gamers is a casual and collaborative live stream gaming platform that allows its users to stream together, and easily inherit audiences.',
		cta: {
			primary: {
				text: 'Resume',
				color: 'white',
				functionality: {
					href: 'https://docs.google.com/forms/d/e/1FAIpQLSf5lOCNC9kN6wLPiBg6R46yV4dJwglrQaHyqSUg_r9L_bHaJw/viewform',
					target: '_blank',
				},
			},
			secondary: {
				text: 'Work with me',
				color: 'secondary-light',
				functionality: {
					// onClick: () => {
					// 	openRegisterPage();
					// },
				},
			},
		},
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Hero heroObject={heroObject} backgroundImage={backgroundImage} backgroundImageDescription={backgroundImageDescription} />