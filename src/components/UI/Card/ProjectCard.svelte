<script lang="ts">
	import Image from '../Image/Image.svelte'
	import Button from '../Button/Button.svelte';
	import Github from '../../../icons/github.svelte';
	import DesktopComputer from '../../../icons/desktop-computer.svelte';

	export let content = '';
	export let title = '';
	export let alt = '';
	export let imgSrc = '';
	export let imgClasses = '';
	export let classes = '';
	export let projectLink = '';
	export let repoLink = '';

	const linkClasses = 'text-black hover:text-dh-secondary-dark-500 dark:text-white dark:hover:text-dh-secondary-dark-500';
</script>

<div class={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${classes}`}>
	{#if imgSrc}		
		<Image classes={imgClasses} src={imgSrc} {alt} />
	{/if}
	<div class="p-6">
		<h2 class="font-bold mb-2 text-2xl text-dh-secondary-dark-500">{title}</h2>
		<p class="text-black dark:text-white mb-2">{content}</p>
		<div class="flex items-center justify-start">
			{#if projectLink || repoLink}
				<div class="flex justify-start">
					{#if projectLink}
						<a href={projectLink} target="_blank" aria-label={`Link to ${title} site in new tab`} class={`${linkClasses}`}>
							<DesktopComputer formattedClassName="w-8 h-8" solid />
						</a>
					{/if}
					{#if repoLink}
						<a href={repoLink} target="_blank" aria-label={`Link to ${title} repo in new tab`} class={`ml-4 ${linkClasses}`}>
							<Github formattedClassName="w-8 h-8" />
						</a>
					{/if}
				</div>
			{/if}
		</div>

	</div>
</div>
