<script lang="ts">
    import Icon from '../../Icon/Icon.svelte';
    import Button from '../../Button/Button.svelte';

    export let button;
    export let icon;
    export let trigger;
    export let text = '';
    export let isOpen;
    export let toggleDropdown;
    // TODO: fix iconProps default 
    let iconProps;
    if (icon) {
      iconProps = { ...icon };
      iconProps.className = `transition duration-200 transform ${isOpen && iconProps.rotate ? 'rotate-90' : ''}`;
    }
</script>
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