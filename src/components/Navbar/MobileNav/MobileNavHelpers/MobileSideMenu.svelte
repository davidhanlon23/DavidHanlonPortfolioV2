<script lang="ts">
    import { nav } from '../../nav.enum';
    import PrimarySideMenu from './PrimarySideMenu.svelte';
    import MoreSideMenu from './MoreSideMenu.svelte';

    export let toggleMobileSideMenu = undefined;
    export let mobileSideMenu = false;

    const { mobile } = nav;
    let activeSideMenu = false;
    function setActiveSideMenu(activeStatus){
      activeSideMenu = activeStatus;
    }

    function getMenuItem(itemName) {
        if (!itemName) {
          setActiveSideMenu(null);
          return;
        }
        // eslint-disable-next-line no-restricted-globals
        const secondarySideMenu = mobile.primary.items.find((item) => {
          return item.label === itemName;
        });
        setActiveSideMenu(secondarySideMenu);
    }
    function handleClick(item) {
        if (item.children && item.children.length) {
          getMenuItem(item.label);
        } else {
          toggleMobileSideMenu(false);
        }
    }
</script>
<div class={`fixed z-220 top-0 left-0 w-full h-full lg:hidden transition-all ease-in duration-400 ${mobileSideMenu ? 'visible' : 'invisible'}`}>
    <div id="sidebar-overlay" class="z-210 bg-black opacity-50 w-full h-full" onClick={() => toggleMobileSideMenu(!mobileSideMenu)} />
    <div class={`overflow-hidden absolute top-0 left-0 z-220 bg-white dark:bg-black w-4/5 h-full transition-all ease-in-out duration-500 ${mobileSideMenu ? 'ml-0' : '-ml-152'}`}>
      <div class="second-container pb-10 h-full overflow-y-scroll" width='103%'>
        <PrimarySideMenu
          activeSideMenu={activeSideMenu}
          mobile={mobile}
          handleClick={handleClick}
        />
        <MoreSideMenu
          activeSideMenu={activeSideMenu}
          handleClick={handleClick}
          mobile={mobile}
          setActiveSideMenu={setActiveSideMenu}
        />
        <!-- <MobileMenuFooter isAuthenticated={isAuthenticated} logout={logout} /> -->
      </div>
    </div>
  </div>