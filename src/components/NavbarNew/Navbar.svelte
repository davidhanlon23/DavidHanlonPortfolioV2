<script lang="ts">
    import DesktopNav from './DesktopNav/DesktopNav.svelte';
    import MobileNav from './MobileNav/MobileNav.svelte'; 
	

</script>

<DesktopNav {...$$props} />
<MobileNav {...$$props} />