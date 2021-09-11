<script lang="ts">
    import Image from '../../Image/Image.svelte';
    import { getDivHeight } from '../../../../utils/common';
   
    export let backgroundImage = '';
    export let backgroundColor = '';
    export let imageDescription = '';
    export let overlayColor = '';
    export let overlayOpacity = '';
    export let backgroundHeight = '';
    const bgColor = backgroundColor || 'bg-dh-primary-500';
    backgroundHeight = getDivHeight(backgroundHeight);
</script>
{#if backgroundImage}
    <Image classes={`${backgroundHeight} w-full object-cover bg-center`} src={backgroundImage} alt={imageDescription} />
    <div class={`absolute inset-0 ${overlayColor} ${overlayOpacity}`} />
{:else}
    <div class={`${bgColor} ${backgroundHeight} w-full object-cover`} />
{/if}