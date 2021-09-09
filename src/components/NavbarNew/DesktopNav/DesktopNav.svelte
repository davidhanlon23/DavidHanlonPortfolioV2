<script lang="ts">
   import MainNav from "./DesktopNavHelpers/MainNav.svelte";
   const formattedClassName = $$props.className;
   export let isDarkMode: boolean;
</script>

<MainNav bind:isDarkMode className={`${formattedClassName}`} {...$$props} />
