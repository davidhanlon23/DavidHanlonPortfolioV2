<script lang="ts">
    import Dropdown from '../../../UI/Dropdown/Dropdown.svelte';
    import MoreDropdownTrigger from './MoreDropdownTrigger.svelte'; 
    import Button from '../../../UI/Button/Button.svelte';

    export let desktop;
    // export let desktop = {
    //   primary: {
    //     items: {
    //       href: '',
    //       label: '',
    //     },
    //   },
    //   label: '',
    // };
    const children = [{
      component: MoreDropdownTrigger,
    }]

</script>
<div class="m-auto md-991:ml-4 lg:ml-8 xl:ml-12">
        <Dropdown
          id="desktop-user-menu"
          trigger={children}
          className="px-4"
          dropClassName="w-48 bg-white text-dh-primary-dark-500 dark:text-white dark:bg-dh-primary-dark-500 rounded shadow-lg"
        >
          <ul class="pb-4">
            <li class="pt-4 pb-2">
              <div class="font-bold uppercase text-sm ml-4">{desktop.primary.label}</div>
            </li>
            <!-- map through "more dropdown" navigation items-->
            {#each desktop.primary.items as item }
              <li class="">
                <div class="mx-4">
                  <Button classes="flex w-full justify-start px-4 py-1 cursor-pointer text-sm hover:bg-gray-200 rounded shadow-none" href={item.href} text={item.label} />
                </div>
              </li>
            {/each}
          </ul>
        </Dropdown>
  </div>