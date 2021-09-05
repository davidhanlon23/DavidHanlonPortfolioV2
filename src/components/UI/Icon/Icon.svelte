<script lang="ts">
	import ChevronRight from '../../../icons/chevron-right.svelte'
	import Discord from '../../../icons/discord.svelte'
	import DotsVertical from '../../../icons/dots-vertical.svelte'
	import Facebook from '../../../icons/facebook.svelte'
	import Instagram from '../../../icons/instagram.svelte'
	import Search from '../../../icons/search.svelte'
	import Twitter from '../../../icons/twitter.svelte'
	import Youtube from '../../../icons/youtube.svelte'

	export let name = ''
	export let classes = ''
	export let accessibilityProps = undefined
	export let color = ''
	export let solid;
	export let size;

	let iconColor
	if (!name) {
		name = null
	}

	// Get the size className
	function getSizeClassName(size) {
	switch (size) {
		case 'mini':
		return `w-1 h-1`;
		case 'tiny':
		case 'xsmall':
		return `w-2 h-2`;
		case 'small':
		return `w-4 h-4`;
		case 'medium':
		return `w-6 h-6`;
		case 'big':
		case 'large':
		return `w-8 h-8`;
		case 'huge':
		case 'xlarge':
		return `w-12 h-12`;
		case 'massive':
		case '2xlarge':
		return `w-16 h-16`;
		default:
		return size;
	}
	}
	// Get the color className
	function getColorClassName(color) {
	switch (color) {
		case 'gray':
		return `text-gray-400`;
		case 'dark-gray':
		return `text-gray-700`;
		case 'white':
		return `text-white`;
		case 'black':
		return `text-black`;
		case 'pink':
		return `text-pink-500`;
		case 'green':
		return `text-green-500`;
		case 'red':
		return `text-red-500`;
		case 'yellow':
		return `text-yellow-300`;
		case 'orange':
		return `text-orange-500`;
		case 'blue':
		return `text-blue-500`;
		case 'teal':
		return `text-teal-500`;
		case 'indigo':
		return `text-indigo-500`;
		case 'purple':
		return `text-purple-500`;
		default:
		return color;
	}
	}
	const iconMap = {
		cheveronRight: ChevronRight,
		discord: Discord,
		facebook: Facebook,
		instagram: Instagram,
		options: DotsVertical,
		search: Search,
		twitter: Twitter,
		youtube: Youtube
	}
</script>

<svelte:component this={iconMap[name] || null} {classes} {accessibilityProps} {iconColor} />
