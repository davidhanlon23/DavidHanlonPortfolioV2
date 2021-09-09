<script lang="ts">
    import DesktopNav from './DesktopNav/DesktopNav.svelte';
    import MobileNav from './MobileNav/MobileNav.svelte'; 
	
    export let isDarkMode: boolean;
    console.log('props', $$props);
</script>

<DesktopNav {...$$props} bind:isDarkMode />
<MobileNav {...$$props} />