<script lang="ts">
    export let formattedClassName = '';
    export let solid = false;
    export let iconColor = '';
    export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' };

</script>  
{#if solid}
<svg class={`${formattedClassName}`} fill={iconColor || 'currentColor'} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...accessibilityProps}>
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
</svg>
{:else}
<svg class={`${formattedClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>
{/if}
