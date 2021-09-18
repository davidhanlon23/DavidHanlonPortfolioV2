<script lang="ts">
    // import Button from '../../UI/Button/Button.svelte';
    import Linkedin from "../../../icons/linkedin.svelte";
    import Github from "../../../icons/github.svelte";
    import Instagram from "../../../icons/instagram.svelte";
    import Mail from '../../../icons/mail.svelte';
    export let classes = '';

    const buttonClasses = `mx-2 p-2 rounded-full border-2 bg-dh-secondary-dark-500 hover:bg-white border-white text-white hover:text-dh-secondary-dark-500
    dark:bg-dh-secondary-dark-500 dark:hover:bg-black dark:border-black dark:text-black dark:hover:text-dh-secondary-dark-500`;
</script>
<div class={`flex ${classes}`}>
    <button class={buttonClasses}>
        <Linkedin formattedClassName="w-4 h-4" />
    </button>
    <button class={buttonClasses}>
        <Github formattedClassName="w-4 h-4" />
    </button>
    <!-- <button class="mx-2">HiredDotCom</button> -->
    <button class={buttonClasses}>
        <Instagram classes="w-4 h-4" />
    </button>
    <button class={buttonClasses}>
        <Mail formattedClassName="w-4 h-4" />
    </button>
</div>