<script lang="ts">
   // import MobileSearchBar from './MobileNavHelpers/MobileSearchBar.svelte';
  import MobileSideMenu from "./MobileNavHelpers/MobileSideMenu.svelte";
  import MobileHeaderItems from "./MobileNavHelpers/MobileHeaderItems.svelte";

  let mobileSideMenu = false;
  let searchBar = false;

  function toggleMobileSideMenu(){
    mobileSideMenu = !mobileSideMenu;
  }
  function toggleSearchBar(){
    searchBar = !searchBar;
  }
</script>
<!-- <div class={`md:hidden text-green-400 bg-blue-500 ${className}`}>
   MobileNav
</div> -->

<div class={`${$$props.formattedClassName} w-full block fixed md:hidden z-50`}>
      <div class="border-b h-16" >
        <div class={`${searchBar ? 'hidden' : 'block'} flex items-center px-4`}>
          <MobileHeaderItems toggleMobileSideMenu={toggleMobileSideMenu} mobileSideMenu={mobileSideMenu} toggleSearchBar={toggleSearchBar} searchBar={searchBar} />
        </div>
        <!-- <div class={`${searchBar ? 'block' : 'hidden'} lg:hidden flex items-center px-4 pb-4 pt-2 justify-center`}>
          <MobileSearchBar toggleSearchBar={toggleSearchBar} />
        </div> -->
      </div>
      <MobileSideMenu
        mobileSideMenu={mobileSideMenu}
        toggleMobileSideMenu={toggleMobileSideMenu}
      />
    </div>
