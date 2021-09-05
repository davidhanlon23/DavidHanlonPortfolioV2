<script lang="ts">
// backgroundImage, backgroundColor, imageDescription, overlayColor, overlayOpacity
const bgColor = backgroundColor || 'bg-sgPrimaryLight-500';

</script>
{#if backgroundImage}
    <Image class="h-full w-full object-cover bg-center" src={backgroundImage} alt={imageDescription} />
    <div class={`absolute inset-0 ${overlayColor} ${overlayOpacity}`} />
{:else}
    <div class={`${bgColor} h-full w-full object-cover`} />

{/if}