<script lang="ts">
    import Dropdown from "../../../UI/Dropdown/Dropdown.svelte";
    import UserDropdownTrigger from "./UserDropdownTrigger.svelte";
    import Button from '../../../UI/Button/Button.svelte';
    import Divider from "../../../UI/Divider/Divider.svelte";
    export let desktop;

    const children = [{
      component: UserDropdownTrigger,
    }]
</script>
<Dropdown
        id="desktop-user-menu"
        trigger={children}
        className="cursor-pointer my-auto p-2 rounded md:ml-2 mr-4"
        dropClassName="w-48 bg-white dark:bg-red-500 rounded shadow-lg"
      >
      <ul class="pb-4">
          <!-- map through "user dropdown" navigation items-->
          {#each desktop.secondaryLoggedOut.items as item }
          <li>
            <div class="mx-4 mt-2">
              <Button
                href={item['href']}
                text={item['label']}
                icon={{ name: item['icon'], position: 'left', color: 'black', size: 'small', className: 'mr-4', solid: false }}
                classes="flex w-full shadow-none items-center px-4 py-1 text-sm cursor-pointer hover:bg-gray-200 rounded"
              />
            </div>
          </li>
        {/each}
        <li>
          <Divider />
        </li>
        <li>
          <div class="mx-4 mt-2">
            <Button
              href="/admin"
              icon={{ name: 'login', position: 'left', color: 'black', size: 'small', className: 'mr-4', solid: true }}
              classes="flex w-full shadow-none items-center px-4 py-1 text-sm cursor-pointer hover:bg-gray-200 rounded"
            >
              Admin
            </Button>
          </div>
        </li>
      </ul>
      </Dropdown>