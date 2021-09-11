<script lang="ts">
    export let children = [];
    console.log('props', children[0].component);
</script>
<!-- <svelte:component this={children[0].component} /> -->