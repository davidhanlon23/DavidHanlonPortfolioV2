<script lang="ts">
    import Image from '../Image/Image.svelte';
    // backgroundImage, backgroundColor, imageDescription, overlayColor, overlayOpacity
    export let backgroundImage = '';
    export let backgroundColor = '';
    export let imageDescription = '';
    export let overlayColor = '';
    export let overlayOpacity = '';
    const bgColor = backgroundColor || 'bg-sgPrimaryLight-500';

</script>
{#if backgroundImage}
    <Image classes="h-full w-full object-cover bg-center" src={backgroundImage} alt={imageDescription} />
    <div class={`absolute inset-0 ${overlayColor} ${overlayOpacity}`} />
{:else}
    <div class={`${bgColor} h-full w-full object-cover`} />

{/if}