<script lang="ts">
   // import MobileSearchBar from './MobileNavHelpers/MobileSearchBar.svelte';
   // import MobileSideMenu from "./MobileNavHelpers/MobileSideMenu.svelte";
	export let className = '';

</script>
<div class={`md:hidden text-green-400 bg-blue-500 ${className}`}>
   MobileNav
</div>
<!--
<div class={`${formattedClassName} w-full block fixed md:hidden z-50`}>
      <div class="border-b" style={{ height: '4rem' }}>
        <div class={`${searchBar ? 'hidden' : 'block'} flex items-center px-4`}>
          <MobileHeaderItems toggleMobileSideMenu={toggleMobileSideMenu} mobileSideMenu={mobileSideMenu} toggleSearchBar={toggleSearchBar} searchBar={searchBar} />
        </div>
        <div class={`${searchBar ? 'block' : 'hidden'} lg:hidden flex items-center px-4 pb-4 pt-2 justify-center`}>
          <MobileSearchBar toggleSearchBar={toggleSearchBar} />
        </div>
      </div>
      <MobileSideMenu
        logout={logout}
        avatarImg={avatarImg}
        userName={userName}
        isAuthenticated={isAuthenticated}
        mobileSideMenu={mobileSideMenu}
        toggleMobileSideMenu={toggleMobileSideMenu}
      />
    </div>



-->