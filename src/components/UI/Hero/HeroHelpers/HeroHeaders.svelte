<script lang="ts"> 
  export let heroPrimaryHeader = '';
  export let heroSecondaryHeader = '';
</script>
<div class="text-center font-extrabold tracking-tight pt-16 md:pt-0 sm:text-5xl text-4xl lg:text-4xl">
    <span class="block text-dh-secondary-dark-500 dark:text-dh-secondary-dark-500">{heroPrimaryHeader}</span>
    <span class="block text-dh-secondary-dark-500 dark:text-white">{heroSecondaryHeader}</span>
</div>