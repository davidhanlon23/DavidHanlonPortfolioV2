<script lang="ts">
  import MobileSideMenu from "./MobileNavHelpers/MobileSideMenu.svelte";
  import MobileHeaderItems from "./MobileNavHelpers/MobileHeaderItems.svelte";

  let mobileSideMenu = false;

  function toggleMobileSideMenu(activeStatus){
    mobileSideMenu = activeStatus;
  }
</script>


<div class={`${$$props.className} w-full block fixed md:hidden z-50`}>
      <div class="border-b h-16 border-gray-200 dark:border-gray-700" >
        <div class={`flex items-center px-4`}>
          <MobileHeaderItems toggleMobileSideMenu={toggleMobileSideMenu} mobileSideMenu={mobileSideMenu} />
        </div>
      </div>
      <MobileSideMenu
        mobileSideMenu={mobileSideMenu}
        toggleMobileSideMenu={toggleMobileSideMenu}
      />
    </div>
