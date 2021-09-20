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

	const linkClasses = 'w-8 h-8 text-black hover:text-dh-secondary-dark-500 dark:text-white dark:hover:text-dh-secondary-dark-500';
</script>

<div class={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${classes}`}>
	{#if imgSrc}		
		<Image classes={imgClasses} src={imgSrc} {alt} />
	{/if}
	<div class="p-6">
		<h2 class="font-bold mb-2 text-2xl text-dh-secondary-dark-500">{title}</h2>
		<p class="text-black dark:text-white mb-2">{content}</p>
		<div class="flex items-center justify-center">
			<Button classes="border-2 py-2 px-4 border-dh-secondary-dark-500 text-dh-secondary-dark-500 hover:text-white hover:bg-dh-secondary-dark-500 dark:hover:text-black" text="View More" href="/projects" />
			{#if projectLink || repoLink}
				<div class="flex justify-end">
					{#if projectLink}
						<a href={projectLink} target="_blank" aria-label={`Link to ${title} site in new tab`} class={`mx-4 ${linkClasses}`}>
							<DesktopComputer solid />
						</a>
					{/if}
					{#if repoLink}
						<a href={repoLink} target="_blank" aria-label={`Link to ${title} repo in new tab`} class={linkClasses}>
							<Github />
						</a>
					{/if}
				</div>
			{/if}
		</div>

	</div>
</div>
