<script lang="ts">
    import Icon from '../UI/Icon/Icon.svelte';
    import { theme } from '../../stores/store'; 

    $: iconName = $theme === 'dark' ? 'sun' : 'moon';

    function handleDarkModeToggle(){
        if(localStorage.getItem("theme") === 'light'){
        theme.set('dark');
        }
        else if(localStorage.getItem("theme") === 'dark'){
        theme.set('light');
        }
    }
</script>
{#key theme}
    <button on:click={()=>handleDarkModeToggle()} class="flex w-full justify-end items-center" aria-label={`Toggle Theme to ${iconName === 'sun'? 'Light Mode':'Dark Mode'}`}>
        <Icon name={iconName} color="black" classes="w-6 h-6 hover:text-dh-secondary-dark-500 dark:hover:text-dh-secondary-dark-500" solid/> 
    </button>
{/key}