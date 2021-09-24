<script lang="ts">
    // TODO: fix svelte ignore error and dropdowns
    import { theme } from '../../../../stores/store'; 
    import Button from '../../../UI/Button/Button.svelte';

    import Icon from '../../../UI/Icon/Icon.svelte';
    import MoreDropdown from './MoreDropdown.svelte';
    import { nav } from '../../nav.enum';

    const { desktop } = nav;
    const formattedClassName = $$props.className;
    $: iconName = $theme === 'dark' ? 'sun' : 'moon';

    function handleDarkModeToggle(){
        if(localStorage.getItem("theme") === 'light'){
          theme.set('dark');
        }
        else if(localStorage.getItem("theme") === 'dark'){
          theme.set('light');
        }
      }
</script>
    <!-- svelte-ignore component-name-lowercase -->
    <nav class={`${formattedClassName} hidden md:h-16 md:flex md:content-end z-50 md:top-0 md:fixed md:w-full`}>
      <div class="flex w-full">
        <div class="flex w-full">
          <div class="hover:bg-gray-200 dark:hover:bg-gray-800">
            <Button href="/" classes="shadow-none p-4 text-black dark:text-white hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500 text-2xl font-bold" text="David M. Hanlon" />
          </div>
          <div class="my-auto px-2  md-991:ml-8 lg:ml-8 xl:ml-12">
            <Button classes="md:text-sm md-991:text-md lg:text-lg font-bold text-black dark:text-white hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500 shadow-none" href="/projects" type="button" text="Projects" />
          </div>
          <div class="my-auto px-2  md-991:ml-8 lg:ml-8 xl:ml-12">
            <Button classes="md:text-sm md-991:text-md lg:text-lg font-bold text-black dark:text-white hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500 shadow-none" href="/contact" type="button" text="Contact" />
          </div>
          <MoreDropdown desktop={desktop} />
        </div>
        <div class="flex mx-4">
          {#key theme}
          <button on:click={()=>handleDarkModeToggle()} class="flex w-full justify-end items-center">
              <Icon name={iconName} color="black" classes="w-6 h-6 hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500" solid/> 
          </button>
          {/key}
        </div>
      </div>
    </nav>

