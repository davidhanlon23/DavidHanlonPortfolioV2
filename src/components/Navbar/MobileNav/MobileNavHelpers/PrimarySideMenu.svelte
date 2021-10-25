<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';
    
    export let activeSideMenu = false;
    export let mobile = {
    primary: {
      label: '',
      items: [
        {
          label: '',
          icon: '',
          href: '',
          id: '',
        },
      ],
    },
  };
  export let handleClick = undefined;

</script>
<!-- {/* primary side nav */} -->
{#if !activeSideMenu }
    <!-- {/* Mobile Nav Header */} -->
    <div class="flex items-center px-2 mx-auto border-b border-gray-300 dark:border-gray-600 py-2 mb-6">
      <Button href="/" classes="shadow-none p-4">
        <Icon name="calendar" size="large" color="primary" />
      </Button>
    </div>
    <!-- {/* Mobile Buttons Header */} -->
    <ul class="mb-10">
      <li>
        <p class="text-xs uppercase pb-2 font-bold pl-6 text-black dark:text-white">Navigation</p>
      </li>
      <!-- {/* Mobile Primary Buttons... Always Display */} -->
      {#each mobile.primary.items as item}
        <li>
          <Button
            onClick={() => handleClick(item)}
            href={(item && item.href) ? item.href : ''}
            classes="flex w-9/10 mx-4 my-2 items-center cursor-pointer py-1 px-6 shadow-none rounded hover:bg-gray-700"
          >
            <Icon name={item.icon} classes="h-8 w-8 mr-3" color="primary" />
            <p class="text-lg text-gray-500 dark:text-gray-200">{item.label}</p>
            {#if item && mobile.primary.items.length > 0}
                <Icon name="chevron-right" classes="h-5 w-5 ml-auto text-gray-500 dark:text-gray-200" />
            {/if}
          </Button>
        </li>
        {/each}
    </ul>
{/if}