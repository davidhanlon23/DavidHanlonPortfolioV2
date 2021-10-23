<script lang="ts">
  import MobileSideMenu from "./MobileNavHelpers/MobileSideMenu.svelte";
  import MobileHeaderItems from "./MobileNavHelpers/MobileHeaderItems.svelte";

  let mobileSideMenu = false;

  function toggleMobileSideMenu(){
    mobileSideMenu = !mobileSideMenu;
  }
</script>


<div class={`${$$props.className} w-full block fixed md:hidden z-50`}>
      <div class="border-b h-16" >
        <div class={`flex items-center px-4`}>
          <MobileHeaderItems toggleMobileSideMenu={toggleMobileSideMenu} mobileSideMenu={mobileSideMenu} />
        </div>
      </div>
      <MobileSideMenu
        mobileSideMenu={mobileSideMenu}
        toggleMobileSideMenu={toggleMobileSideMenu}
      />
    </div>
