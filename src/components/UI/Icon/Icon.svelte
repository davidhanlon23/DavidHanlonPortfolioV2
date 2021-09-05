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

	let iconColor
	if (!name) {
		name = null
	}

	switch (color) {
		case 'white':
			iconColor = '#ffffff'
			break
		case 'primary':
			iconColor = '#76CAE3'
			break
		default:
			iconColor = '#000000'
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
