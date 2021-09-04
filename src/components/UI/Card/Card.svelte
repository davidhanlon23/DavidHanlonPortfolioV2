<script lang="ts">
	import Image from '../Image/Image.svelte'

	export let content = ''
	export let title = ''
	export let alt = ''
	export let imgSrc = ''
	export let imgClasses = ''
</script>

{#if imgSrc}
	<Image classes={imgClasses} src={imgSrc} {alt} />
{/if}
<div class="py-4 px-8">
	{#if title}
		<div class="mt-2 text-2xl text-homePrimary">
			{title}
		</div>
	{/if}
	{#if content}
		<p class="py-3 dark:text-white leading-6">
			{content}
		</p>
	{/if}
</div>
