<!--
export default function MobileSideMenu({ mobileSideMenu, toggleMobileSideMenu, isAuthenticated, logout, userName, avatarImg }) {
  const [activeSideMenu, setActiveSideMenu] = useState(null);

-->
<script lang="ts">
    import { nav } from '../../nav.enum';

    export let toggleMobileSideMenu = undefined;
    export let mobileSideMenu = false;

    const { mobile } = nav;

    function getMenuItem(itemName) {
        if (!itemName) {
        setActiveSideMenu(null);
        return;
        }
        // eslint-disable-next-line no-restricted-globals
        const secondarySideMenu = find(mobile.primary.items, (item) => {
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
    function getHref(item) {
        let link = '';
        if (!(item.children && item.children.length) && item.href !== '/profile') {
        link = item.href;
        } else if (!(item.children && item.children.length) && item.href === '/profile') {
        link = `/${userName}${item.href}`;
        }

        return link;
    }
</script>
<div class={`fixed z-220 top-0 left-0 w-full h-full lg:hidden transition-all ease-in duration-400 ${mobileSideMenu ? 'visible' : 'invisible'}`}>
    <div id="sidebar-overlay" class="z-210 bg-black opacity-50 w-full h-full" onClick={() => toggleMobileSideMenu(!mobileSideMenu)} />
    <div class={`overflow-hidden absolute top-0 left-0 z-220 bg-white w-4/5 h-full transition-all ease-in-out duration-500 ${mobileSideMenu ? 'ml-0' : '-ml-152'}`}>
      <div class="second-container pb-10 h-full overflow-y-scroll" width='103%'>
        <PrimarySideMenu
          activeSideMenu={activeSideMenu}
          mobile={mobile}
          handleClick={handleClick}
          isAuthenticated={isAuthenticated}
          userName={userName}
          avatarImg={avatarImg}
          toggleMobileSideMenu={toggleMobileSideMenu}
          setActiveSideMenu={setActiveSideMenu}
        />
        <AccountSideMenu
          activeSideMenu={activeSideMenu}
          avatarImg={avatarImg}
          userName={userName}
          handleClick={handleClick}
          getHref={getHref}
          mobile={mobile}
          setActiveSideMenu={setActiveSideMenu}
        />
        <MobileMenuFooter isAuthenticated={isAuthenticated} logout={logout} />
      </div>
    </div>
  </div>