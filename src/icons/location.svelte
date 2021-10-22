<script lang="ts">
    export let solid = false;
    export let formattedClassName = '';
    export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' }


</script>

    {#if solid}
        <svg class={`${formattedClassName}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...accessibilityProps}>
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
    {:else}
        <svg class={`${formattedClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" {...accessibilityProps}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
    {/if}