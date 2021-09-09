<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Hero from '../components/UI/Hero/Hero.svelte';
	import resume from '../../static/Resume/DavidHanlonResume.pdf';

	const backgroundImage = 'https://i.pinimg.com/originals/5d/ca/87/5dca87b6088664ae9fa8080986a58b4c.png';
  	const backgroundImageDescription = 'Hero Image Background';
	const heroObject = {
		primaryHeader: 'This Primary Header,',
		secondaryHeader: 'This is secondary header',
		subText: 'This is a bunch of subtext that should be somewhat important...klasf;lkasj;flkajf;lskjf;slkf',
		cta: {
			primary: {
				text: 'Resume',
				color: 'white',
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
				color: 'green',
				functionality: {
					onClick: () => {
						console.log('Work with me clicked!')
					},
				},
				accessibilityProps:{},

			},
		},
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Hero heroObject={heroObject} backgroundImage={backgroundImage} backgroundImageDescription={backgroundImageDescription} />