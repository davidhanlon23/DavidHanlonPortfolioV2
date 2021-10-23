<script lang="ts">
    export let solid = false;
    export let formattedClassName = '';
    export let accessibilityProps = { 'role': 'none', 'aria-hidden': true, 'focusable': 'false' }

</script>


{#if solid}
    <svg class={`${formattedClassName}`} fill="currentColor" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg" {...accessibilityProps}>
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
    </svg>
{:else}
    <svg class={`${formattedClassName}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg" {...accessibilityProps}>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>

{/if}
  