<script lang="ts">
    export let solid = false;
    export let formattedClassName = '';
    export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' };
    export let iconColor = '';
</script>
{#if solid}
<svg class={`${formattedClassName}`} fill={iconColor || 'currentColor'} viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg" {...accessibilityProps}>
    <path
      fill-rule="evenodd"
      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1
        1 0 011.414 0z"
      clip-rule="evenodd"
    />
</svg>
{/if}
<svg class={`${formattedClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
</svg>
