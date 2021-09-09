<script lang="ts">
   import MainNav from "./DesktopNavHelpers/MainNav.svelte";
   const formattedClassName = $$props.className;
</script>

<MainNav className={`${formattedClassName}`} {...$$props} />
