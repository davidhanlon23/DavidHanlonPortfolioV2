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
    secondary: {
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
    <div class="flex items-center px-2 mx-auto border-b border-gray-300 py-2 mb-6">
      <Button href="/" classes="shadow-none p-4">
        <Icon name="calendar" size="large" />
      </Button>
    </div>
    <!-- {/* Mobile Buttons Header */} -->
    <ul class="mb-10">
      <li>
        <p class="text-xs uppercase pb-2 font-bold pl-6">Navigation</p>
      </li>
      <!-- {/* Mobile Primary Buttons... Always Display */} -->
      {#each mobile.primary.items as item}
        <li>
          <Button
            onClick={() => handleClick(item)}
            href={!(item && item.href) ? item.href : ''}
            classes="flex w-9/10 mx-4 my-2 items-center cursor-pointer py-1 pl-6 shadow-none rounded hover:bg-gray-200"
          >
            <Icon name={item.icon} classes="h-8 w-8 mr-3 text-gray-500" />
            <p class="text-lg text-gray-500">{item.label}</p>
            {#if item && mobile.primary.items.length > 0}
                <Icon name="chevron-right" classes="h-5 w-5 ml-auto text-gray-500" />
            {/if}
          </Button>
        </li>
        {/each}
    </ul>
{/if}