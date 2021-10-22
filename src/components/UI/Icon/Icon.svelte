<script lang="ts">
	import DotsHorizontal from '../../../icons/dots-horizontal.svelte';
	import ChevronRight from '../../../icons/chevron-right.svelte';
	import DotsVertical from '../../../icons/dots-vertical.svelte';
	import Instagram from '../../../icons/instagram.svelte';
	import Search from '../../../icons/search.svelte';
	import Moon from '../../../icons/moon.svelte';
	import User from '../../../icons/user.svelte';
	import X from '../../../icons/x.svelte';
	import Login from '../../../icons/login.svelte';
	import Sun from '../../../icons/sun.svelte';
	import Menu from '../../../icons/menu.svelte';
	import Calendar from '../../../icons/calendar.svelte';
	import AcademicCap from '../../../icons/academic-cap.svelte';
	import Location from '../../../icons/location.svelte';	

	export let name = '';
	export let classes = '';
	export let accessibilityProps = undefined;
	export let color = '';
	export let solid = false;
	export let size = '';
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
			return `text-black dark:text-white`;
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
			case 'primary':
			return `text-dh-secondary-dark-500`;
			default:
			return color;
		}
	}
	const c = getColorClassName(color);
  	const s = getSizeClassName(size) || '';
  	const cn = classes || '';
  	const formattedClassName = `${c} ${s} ${cn}`;
	const iconMap = {
		cheveronRight: ChevronRight,
		instagram: Instagram,
		'dots-vertical': DotsVertical,
		search: Search,
		'dots-horizontal': DotsHorizontal,
		moon: Moon,
		login: Login,
		sun: Sun,
		user: User,
		x: X,
		menu: Menu,
		calendar: Calendar,
		'academic-cap': AcademicCap,
		location: Location,


	}
</script>

<svelte:component this={iconMap[name] || null} {formattedClassName} {accessibilityProps} {solid} />
