<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';
    import ToggleThemeButton from '../../ToggleThemeButton.svelte';
    import MobileMenuButton from './MobileMenuButton.svelte';
    import Logo from '../../../../icons/dhLogo.svelte';
    export let toggleMobileSideMenu = undefined;
    export let mobileSideMenu = false;

</script>

        <div>
          <MobileMenuButton className="h-8 w-8 cursor-pointer stroke-current text-gray-600 hover:text-black" onClick={() => toggleMobileSideMenu(!mobileSideMenu)} />
        </div>
        <div class="px-2 mx-auto">
          <Button href="/" classes="shadow-none p-4" accessibilityProps={{'aria-label' : 'DH - Click to return to home page'}}>
            <Logo formattedClassName="w-10 h-10 text-dh-secondary-dark-500" />
          </Button>
        </div>
        <div>
          <ToggleThemeButton />
        </div>