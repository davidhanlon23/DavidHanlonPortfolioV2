<script lang="ts">
	import Icon from '../Icon/Icon.svelte';
	import Loading from '../Loading/Loading.svelte';

	export let classes = '';
	export let type = '';
	export let color = '';
	export let text = '';
	export let icon = {
		position: '',
		name: '',
		size: '',
		className: '',
		color: '',
		solid: false,

	};
	export let onClick = () => {};
	export let accessibilityProps = {};
	export let loading = false;
	export let loadingClassName = '';
	export let href = '';
	export let target = '';
	export let disabled = false;
	export let size = '';
	const iconStyle = icon ? 'flex' : '';
	const btnType = type === 'submit' ? 'submit' : 'button';
	let btnSize;
	let fontSize;
	let btnBgColor;
	let btnBgColorHover;
	let btnTextColor = 'text-black';
	switch (color) {
		case 'primary':
		btnBgColor = `bg-dh-secondary-dark-500 dark:bg-white`;
		btnBgColorHover = `hover:bg-dh-secondary-dark-400 dark:hover:bg-gray-100`;
		btnTextColor = `text-white dark:text-dh-primary-dark-500 `;
		break;
		case 'secondary':
		btnBgColor = `bg-dh-primary-dark-500 dark:bg-dh-secondary-dark-500`;
		btnBgColorHover = `hover:bg-gray-700 dark:hover:bg-dh-secondary-dark-400`;
		btnTextColor = `text-white dark:text-dh-primary-dark-500`;
		break;
		case 'gray':
		btnBgColor = `bg-gray-300`;
		btnBgColorHover = `hover:bg-gray-400`;
		btnTextColor = `text-black`;
		break;
		case 'white':
		btnBgColor = `bg-white`;
		btnBgColorHover = `hover:bg-gray-200`;
		btnTextColor = `text-sgPrimaryLight-500`;
		break;
		case 'black':
		btnBgColor = `bg-dh-primary-dark-500`;
		btnBgColorHover = `hover:bg-gray-900`;
		break;
		case 'pink':
		btnBgColor = `bg-pink-500`;
		btnBgColorHover = `hover:bg-pink-600`;
		break;
		case 'green':
		btnBgColor = `bg-green-500 dark:bg-pink-500`;
		btnBgColorHover = `hover:bg-green-600`;
		break;
		case 'red':
		btnBgColor = `bg-red-500`;
		btnBgColorHover = `hover:bg-red-600`;
		break;
		case 'yellow':
		btnBgColor = `bg-yellow-500`;
		btnBgColorHover = `hover:bg-yellow-600`;
		break;
		case 'orange':
		btnBgColor = `bg-orange-500`;
		btnBgColorHover = `hover:bg-orange-600`;
		break;
		case 'blue':
		btnBgColor = `bg-blue-500`;
		btnBgColorHover = `hover:bg-blue-600`;
		break;
		case 'teal':
		btnBgColor = `bg-teal-400`;
		btnBgColorHover = `hover:bg-teal-500`;
		break;
		case 'indigo':
		btnBgColor = `bg-indigo-500`;
		btnBgColorHover = `hover:bg-indigo-600`;
		break;
		case 'purple':
		btnBgColor = `bg-purple-500`;
		btnBgColorHover = `hover:bg-purple-600`;
		break;
		default:
		btnBgColor = ``;
		btnBgColorHover = ``;
		btnTextColor = ``;
	}

	switch (size) {
		case 'mini':
		btnSize = 'p-2';
		fontSize = 'text-xs';
		break;
		case 'tiny':
		btnSize = 'p-2';
		fontSize = 'text-sm';
		break;
		case 'small':
		btnSize = 'p-2';
		fontSize = 'text-base';
		break;
		case 'medium':
		btnSize = 'p-2';
		fontSize = 'text-lg';
		break;
		case 'large':
		btnSize = 'p-2';
		fontSize = 'text-xl';
		break;
		case 'big':
		btnSize = 'p-2';
		fontSize = 'text-2xl';
		break;
		case 'huge':
		btnSize = 'p-2';
		fontSize = 'text-3xl';
		break;
		case 'massive':
		btnSize = 'p-2';
		fontSize = 'text-4xl';
		break;
		default:
		btnSize = ``;
		fontSize = ``;
	}

	const handleClick = () => {
		if (href) {
		window.open(href, target || '_self');
		} else if (onClick) {
		onClick();
		}
	};
	const disabledClass = disabled ? `opacity-50 cursor-not-allowed` : '';
	const formattedClassName = classes || '';
	const combinedClassNames = `${iconStyle} ${btnSize} ${fontSize} ${btnBgColor} ${!disabled && btnBgColorHover} ${btnTextColor} ${formattedClassName} ${disabledClass}`;
	const onClickProp = !disabled && !!handleClick ? handleClick: null;

</script>
<button type={btnType} class={`${combinedClassNames} focus:ring bg-center items-center cursor-pointer shadow-xs rounded-full`} on:click={onClickProp} {...accessibilityProps} >
	{#if icon && !loading && icon.position === 'left'}
		<Icon name={icon.name} color={icon.color} solid={icon.solid} size={icon.size} classes={`${icon.className || ''} mr-2`} />
	{/if}
	

	{#if !loading}
		{#if text}
			<span>{text}</span>
		{:else}
		<slot/>
		{/if}
	{/if}
	
	{#if loading }
		<Loading className={loadingClassName || 'h-4 w-4'} isButton />
	{/if}

	{#if icon && !loading && icon.position === 'right'}
		<Icon name={icon.name} color={icon.color} solid={icon.solid} size={icon.size} classes={`${icon.className || ''} ml-2`} />
	{/if}	  
  </button>
