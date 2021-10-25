<script lang="ts">
    export let solid = false;
    export let formattedClassName = '';
    export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' }

</script>
{#if solid}
<svg class={`${formattedClassName}`} fill="currentColor" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg" {...accessibilityProps}>
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
</svg>
{/if}
<svg class={`${formattedClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" {...accessibilityProps}>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
