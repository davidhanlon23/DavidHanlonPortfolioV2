<script lang="ts">
    // TODO: fix svelte ignore error and dropdowns
    import { isDarkMode } from '../../../../stores/store'; 
    import Button from '../../../UI/Button/Button.svelte';
    import Toggle from '../../../Toggle/Toggle.svelte';
    // import Icon from '../../../UI/Icon/Icon.svelte';
    // import MoreDropdown from './MoreDropdown.svelte';
    // import UserDropdown from './UserDropdown.svelte';
    import { nav } from '../../nav.enum';

    const { desktop } = nav;
    const formattedClassName = $$props.className;
    const handleDarkModeToggle = () => {
        isDarkMode.update( currValue => {
            return !currValue;
        });
    };
</script>
<!-- <div class="z-50 md:top-0 md:fixed md:w-full"> -->
    <!-- svelte-ignore component-name-lowercase -->
    <nav class={`${formattedClassName} border-b border-t-0 hidden md:h-16 md:flex md:content-end z-50 md:top-0 md:fixed md:w-full`}>
      <div class="flex">
        <div class="hover:bg-gray-200">
          <Button href="/" classes="shadow-none p-4 text-black hover:text-blue-500 text-2xl font-bold" text="David M. Hanlon" />
            <!-- <Icon name="instagram" size="large" /> -->
        </div>
        <div class="my-auto px-2  md-991:ml-8 lg:ml-8 xl:ml-12">
          <Button classes="md:text-sm md-991:text-md lg:text-lg font-bold text-black hover:text-blue-500 shadow-none" href="/experience" type="button" text="Experience" />
        </div>
        <div class="my-auto px-2  md-991:ml-8 lg:ml-8 xl:ml-12">
          <Button classes="md:text-sm md-991:text-md lg:text-lg font-bold text-black hover:text-red-500 shadow-none" href="/contact" type="button" text="Contact" />
        </div>
        <!-- <MoreDropdown desktop={desktop} /> -->
      </div>
      <Toggle onToggle={handleDarkModeToggle} label="Dark Mode Toggle" />

      <!-- <UserDropdown logout={logout} isAuthenticated={isAuthenticated} userName={userName} /> -->
    </nav>
  <!-- </div> -->