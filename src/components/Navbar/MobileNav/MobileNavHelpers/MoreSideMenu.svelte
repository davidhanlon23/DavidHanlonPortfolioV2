<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';

    export let setActiveSideMenu = undefined;
    export let handleClick = undefined;
    export let activeSideMenu = false;
    export let mobile = {
        secondary: {
            label: 'More',
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
</script>
{#if activeSideMenu}
<div class="flex items-center mx-auto border-b border-gray-300 px-6 py-5 mb-6 bg-gray-100">
    <Button classes="focus:outline-none" onClick={() => setActiveSideMenu('')}>
      <Icon name="chevron-left" classes="h-6 w-6 mr-4 text-black" />
    </Button>
    <!-- <div className="w-full flex justify-center items-center">
      <AvatarImage avatarImg={avatarImg} userName={userName} />
      <p className="text-lg font-semibold text-black">{userName}</p>
    </div> -->
  </div>
  <ul class="mb-10">
    <li>
      <p class="text-xs uppercase font-bold pb-2 pl-6">More</p>
    </li>
    {#each mobile.secondary.items as item}
    <li>
        <Button
          onClick={() => handleClick(item)}
          href={item.href}
          classes="flex w-9/10 mx-4 my-2 items-center cursor-pointer py-1 pl-6 shadow-none rounded hover:bg-gray-200"
        >
          <Icon name={item.icon} classes="h-8 w-8 mr-3 text-gray-500" />
          <p class="text-lg text-gray-500">{item.label}</p>
          {#if item && mobile.secondary.items.length > 0}
            <Icon name="chevron-right" classes="h-5 w-5 ml-auto text-gray-500" />
          {/if}
        </Button>
      </li>
    {/each}
  </ul>
{/if}