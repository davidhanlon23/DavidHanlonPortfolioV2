<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';
    import MobileMenuButton from './MobileMenuButton.svelte';

    export let toggleMobileSideMenu = undefined;
    export let toggleSearchBar = undefined;
    export let mobileSideMenu = false;
    export let searchBar = false;

</script>

        <div>
          <MobileMenuButton className="h-8 w-8 cursor-pointer stroke-current text-gray-600 hover:text-black" onClick={() => toggleMobileSideMenu(!mobileSideMenu)} />
        </div>
        <div class="px-2 mx-auto">
          <Button href="/" classes="shadow-none p-4">
            <Icon name="sleepless-logo" size="large" />
          </Button>
        </div>
        <div>
          <Button classes="cursor-pointer stroke-current text-gray-600 hover:text-black shadow-none" onClick={() => toggleSearchBar(!searchBar)}>
            <Icon name="search" classes="w-8 h-8" />
          </Button>
        </div>