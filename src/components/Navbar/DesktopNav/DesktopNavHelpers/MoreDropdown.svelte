<script lang="ts">
    import Tooltip from '../../../UI/Tooltip/Tooltip.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';
    import Button from '../../../UI/Button/Button.svelte';
    import Dropdown from '../../../UI/Dropdown/Dropdown.svelte';

    export let desktop;
    const items = { component: Button, props: { 
      className:"p-1 hover:bg-gray-200 shadow-none rounded"
      component: Icon,
      iconProps: {}

    } },
</script>
<div class="m-auto md-991:ml-4 lg:ml-8 xl:ml-12">
        <Dropdown
          id="desktop-user-menu"
          trigger={'lol'}
          className="px-4"
          dropClassName="w-48 bg-white rounded shadow-lg"
        >
          <ul class="pb-4">
            <li class="pt-4 pb-2">
              <div class="font-bold uppercase text-sm text-gray-700 ml-4">{desktop.primary.label}</div>
            </li>
            <!-- // {desktop.primary.items.map((item) => ( -->
            <!-- //   <li class="" key={item.id}>
            //     <div class="mx-4">
            //       <Button classes="flex w-full justify-start px-4 py-1 cursor-pointer text-sm hover:bg-gray-200 rounded shadow-none" href={item.href} text={item.label} />
            //     </div>
            //   </li>
            // ))} -->
          </ul>
        </Dropdown>
  </div>