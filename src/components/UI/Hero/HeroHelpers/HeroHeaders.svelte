<script lang="ts"> 
  export let heroPrimaryHeader = '';
  export let heroSecondaryHeader = '';
</script>
<div class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
    <span class="block text-black dark:text-dh-secondary-dark-500">{heroPrimaryHeader}</span>
    <span class="block text-dh-secondary-dark-500 dark:text-white">{heroSecondaryHeader}</span>
</div>