<script lang="ts">
    export let color = '';
    export let message = '';
    export let isButton: boolean;
    export let className = '';
    export let messageClassName = '';

    function getLoaderColor(color) {
        switch (color) {
            case 'white':
            return `loader-white`;
            case 'gray':
            return `loader-gray`;
            case 'pink':
            return `loader-pink`;
            case 'green':
            return `loader-green`;
            case 'red':
            return `loader-red`;
            case 'yellow':
            return `loader-yellow`;
            case 'purple':
            return `loader-purple`;
            case 'teal':
            return `loader-teal`;
            case 'indigo':
            return `loader-indigo`;
            case 'blue':
            return `loader-blue`;
            case 'orange':
            return `loader-orange`;
            case 'black':
            default:
            return 'loader-black';
        }
}

const c = getLoaderColor(color);
const b = isButton ? `border-2 border-t-2` : `border-8 border-t-8`;
</script>
<div class="flex flex-col justify-center items-center">
    <div class={`${c} ${b} animate-spin rounded-full ${className || ''}`} />
    {#if message}
        <div class={`${messageClassName || ''}`}>{message}</div>
    {/if}
    <slot/>
  </div>