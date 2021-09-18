<script lang="ts">
    import { onMount } from 'svelte';
    import Button from '../../UI/Button/Button.svelte';
    export let className = '';
    export let dropClassName = '';
    export let text = '';
    export let trigger = [];
    export let id = '';
    export let button = undefined;
    export let icon = {};
    let isOpen = false;

    onMount( () => {
      function clickHandler(e) {
        const targetElement = document.getElementById(id);
        if (targetElement && !targetElement.contains(e.target)) {
        
          // Clicked outside the dropdown
          isOpen = false;
        }
      }
      // initiate the event handler
      window.addEventListener('click', clickHandler, true);

      // this will clean up the event every time the component is re-rendered
      return function cleanup() {
          window.removeEventListener('click', clickHandler);
        };
    });

    function toggleDropdown(){
      isOpen = !isOpen;
    }

    $: display = isOpen ? 'block' : 'hidden';
    $: visibility = isOpen ? 'visibile' : 'invisibile';
    $: opacity = isOpen ? 'opacity-100' : 'opacity-0';
    $: height = isOpen ? 'h-auto' : '0';
    let iconProps;
    if (icon) {
      iconProps = { ...icon };
      iconProps.className = `transition duration-200 transform ${isOpen && iconProps.rotate ? 'rotate-90' : ''}`;
    }
</script>
<div id={id} class={`relative inline-block top-0 bg-transparent border-none ${className || ''}`}>
    <!-- <Trigger button={button} icon={icon} trigger={trigger} text={text} isOpen={isOpen} toggleDropdown={toggleDropdown} /> -->
    
    {#if button}
        <Button
            type="button"
            text={button.text}
            color={button.color}
            icon={iconProps}
            classes={button.className}
            loading={button.loading}
            onClick={() => toggleDropdown()}
        />
    {/if}
    {#if trigger}
    <div on:click={() => toggleDropdown()} class="flex items-center cursor-pointer">
        <svelte:component this={trigger[0].component} />
        <!-- <Icon name={`dots-horizontal`} color={iconProps.color} solid={iconProps.solid} size="small" classes={`${iconProps.className || ''} ml-2`} /> -->
    </div>
    {/if}
    <p on:click={() => toggleDropdown()} class="cursor-pointer">
        {text}
    </p>
    <div class={`z-30 transition duration-200 overflow-hidden absolute right-0 shadow-xs ${visibility} ${opacity} ${height} ${display} ${dropClassName || ''}`}>
      <slot/>
    </div>
  </div>