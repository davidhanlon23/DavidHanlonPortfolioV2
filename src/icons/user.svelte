<script lang="ts">


    export let solid = false;
    export let formattedClassName = '';
    export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' };
    export let iconColor = '';

</script>
    {#if solid}
     <svg class={`${formattedClassName}`} {...accessibilityProps} fill={iconColor || 'currentColor'} viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>
    {/if}
    <svg class={`${formattedClassName}`} {...accessibilityProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  