<script lang="ts">
    // import Button from '../../UI/Button/Button.svelte';
    import Linkedin from "../../../icons/linkedin.svelte";
    import Github from "../../../icons/github.svelte";
    import Insta from "../../../icons/insta.svelte";
    import Mail from '../../../icons/mail.svelte';
    export let classes = '';
    export let colorPallete = '';

    let buttonClasses = `mx-2 p-2 rounded-full border-2 `
    if(colorPallete ==='mobileMenu'){
        buttonClasses += `bg-white hover:bg-dh-secondary-dark-500 border-black text-black hover:text-white
    dark:bg-dh-primary-dark-500 dark:hover:bg-dh-secondary-dark-500 dark:border-white dark:text-white dark:hover:text-black`;
    }
    else {
        buttonClasses += `bg-dh-secondary-dark-500 hover:bg-white border-white text-white hover:text-dh-secondary-dark-500
    dark:bg-dh-secondary-dark-500 dark:hover:bg-dh-primary-dark-500 dark:border-black dark:text-black dark:hover:text-dh-secondary-dark-500`;
    }
    // const buttonClasses = `mx-2 p-2 rounded-full border-2 bg-dh-secondary-dark-500 hover:bg-white border-white text-white hover:text-dh-secondary-dark-500
    // dark:bg-dh-secondary-dark-500 dark:hover:bg-dh-primary-dark-500 dark:border-black dark:text-black dark:hover:text-dh-secondary-dark-500`;
</script>
<div class={`flex ${classes}`}>
    <a href="https://linkedin.com/in/david-hanlon" target="_blank" aria-label="link to my linkedin profile in new tab" class={buttonClasses}>
        <Linkedin formattedClassName="w-4 h-4" />
    </a>
    <a href="https://github.com/davidhanlon23" target="_blank" aria-label="link to my github in new tab" class={buttonClasses}>
        <Github formattedClassName="w-4 h-4" />
    </a>
    <!-- <button class="mx-2">HiredDotCom</button> -->
    <a href="https://instagram.com/davidmhanlon" target="_blank" aria-label="link to my instagram in new tab" class={buttonClasses}>
        <Insta classes="w-4 h-4" />
    </a>
    <a href="mailto:davidhanlon23@gmail.com" aria-label="click to send me an email" class={buttonClasses}>
        <Mail formattedClassName="w-4 h-4" />
    </a>
</div>