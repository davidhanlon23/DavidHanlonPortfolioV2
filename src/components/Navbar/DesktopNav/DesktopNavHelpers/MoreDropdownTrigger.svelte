<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';
</script>
<Button classes="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-none rounded" accessibilityProps={{'aria-label': 'Toggle More Options Dropdown List'}}>
    <Icon name="dots-horizontal" color="black" size="medium" />
</Button>