<script lang="ts">
    import Button from '../../../UI/Button/Button.svelte';
    import Icon from '../../../UI/Icon/Icon.svelte';

</script>
<Button
        onClick={() => {
          $$props.onClick();
        }}
        classes="shadow-none"
      >
        <Icon name="menu-alt1" size="large" classes="text-black dark:text-white" />
 </Button>