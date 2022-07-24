<script lang="ts">
    import Label from '../UI/Label/Label.svelte';
    import Divider from '../UI/Divider/Divider.svelte';
    import Button from '../UI/Button/Button.svelte';
    import Container from '../UI/Container/Container.svelte';
    import Image from '../UI/Image/Image.svelte';
    export let projects = [
        {
        projectName: '',
        projectWebsite: '',
        projectRepoLink: '',
        projectDescription: ``,
        projectImageUrl: '',
        projectLabelYear: '',
        omitDivider: false,
    },
    ];

    const ctaClasses = "w-full mx-auto mb-4 md:mx-0 md:mb-0 md:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  md:px-8";
</script>
{#each projects as project}
<Container>
    <div class="flex flex-wrap justify-center flex-col md:flex-row my-16 md:w-full">
        <div class="md:max-w-md md:mt-2">
            <!-- IMAGE GOES HERE -->
            <Image src={project.projectImageUrl} />
        </div>
        <div class="mt-8 md:mt-0 md:max-w-md mx-auto">
            <div class="flex mb-12  text-center justify-center md:justify-start">
                <h2 class="text-3xl font-bold text-black dark:text-white">{project.projectName}</h2>
                <Label classes="my-auto items-center" value={project.projectLabelYear} />
            </div>
            <div>
                <p class="text-black dark:text-white text-center md:text-left">{project.projectDescription}</p>
            </div>
            <div class={`flex my-8 ${project.projectWebsite && project.projectRepoLink ? 'flex-col md:flex-row': 'flex-row'}`}>
                {#if project.projectWebsite}
                    <Button classes={`${ctaClasses} ${project.projectRepoLink ? 'md:mr-8':''}`} text="Visit Website" color="primary" href={`${project.projectWebsite}`} accessibilityProps={{'aria-label':`Open ${project.projectName} in a new tab`}} target="_blank" />
                {/if}
                {#if project.projectRepoLink}
                    <Button classes={`${ctaClasses}`} text="Visit Repo" color="secondary" href={`${project.projectRepoLink}`} accessibilityProps={{'aria-label':`Open ${project.projectName}'s repo in a new tab`}} target="_blank" />
                {/if}
            </div>
        </div>
    </div>
</Container>
{#if project.omitDivider === false}
<Divider />
{/if}
{/each}