<script lang="ts">
    import Icon from '../../Icon/Icon.svelte';
    import Button from '../../Button/Button.svelte';

    export let button;
    export let icon;
    export let trigger;
    export let text = '';
    export let openDropDown;
    export let setDropDown;
    // TODO: fix iconProps default 
    let iconProps;
    if (icon) {
      iconProps = { ...icon };
      iconProps.className = `transition duration-200 transform ${openDropDown && iconProps.rotate ? 'rotate-90' : ''}`;
    }
</script>
    {#if button}
        <Button
            type="button"
            text={button.text}
            color={button.color}
            icon={iconProps}
            className={button.className}
            loading={button.loading}
            onClick={() => setDropDown(!openDropDown)}
        />
    {/if}
    {#if trigger}
    <div onClick={() => setDropDown(!openDropDown)} class="flex items-center cursor-pointer">
        {trigger}
        <Icon name={iconProps.name} color={iconProps.color} solid={iconProps.solid} size="small" classes={`${iconProps.className || ''} ml-2`} />
      </div>
    {/if}
    <p onClick={() => setDropDown(!openDropDown)} class="cursor-pointer">
        {text}
    </p>