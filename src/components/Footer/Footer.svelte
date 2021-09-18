<script lang="ts">
	// import Icon from '../UI/Icon/Icon.svelte'
	// import Button from '../UI/Button/Button.svelte'
	// import AddLink from '../UI/AddLink/AddLink.svelte'
	import SocialIcons from './FooterHelpers/SocialIcons.svelte'

	const socials = [
		{
			href: '/',
			name: 'Twitter'
		},
		{
			href: '/',
			name: 'Instagram'
		},
		{
			href: '/',
			name: 'Facebook'
		},
		{
			href: '/',
			name: 'Youtube'
		}
	]

	const borderClasses = 'ml-8 text-left border-l-2 dark:border-gray-400'
	const headerClasses = "dark:text-white dark:text-opacity-60"
	const learnMoreClasses = 'mt-2 tracking-tighter'
</script>

<footer class="bg-dh-secondary-dark-500 dark:bg-dh-secondary-dark-500 py-4 px-20 text-center">
	<div class="flex justify-center m-8">
		<p class="text-2xl text-white dark:text-black">Living, learning, & leveling up one day at a time.</p>
	</div>
	<SocialIcons classes="justify-center mb-8" />
	<div class="m-8 text-center text-white dark:text-black">Hand crafted by me © DMH Global</div>
</footer>
