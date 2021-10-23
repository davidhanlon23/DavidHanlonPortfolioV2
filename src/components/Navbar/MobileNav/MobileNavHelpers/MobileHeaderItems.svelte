<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';
    import ToggleThemeButton from '../../ToggleThemeButton.svelte';
    import MobileMenuButton from './MobileMenuButton.svelte';

    export let toggleMobileSideMenu = undefined;
    export let mobileSideMenu = false;

</script>

        <div>
          <MobileMenuButton className="h-8 w-8 cursor-pointer stroke-current text-gray-600 hover:text-black" onClick={() => toggleMobileSideMenu(!mobileSideMenu)} />
        </div>
        <div class="px-2 mx-auto">
          <Button href="/" classes="shadow-none p-4">
            <Icon name="calendar" size="large" color="primary" />
          </Button>
        </div>
        <div>
          <ToggleThemeButton />
        </div>