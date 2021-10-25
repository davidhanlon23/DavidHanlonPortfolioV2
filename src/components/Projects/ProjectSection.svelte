<script lang="ts">
    import Label from '../UI/Label/Label.svelte';
    export let projects = [
        {
        projectName: '',
        projectWebsite: '',
        projectRepoLink: '',
        projectDescription: ``,
        projectImageUrl: '',
    },
    ];
    /*
        font-size: 12px;
        vertical-align: middle;
        margin-left: 5px;

        color: #fff;
        background-color: #5b43d6;

            display: inline-block;
            padding: .25em .4em;
            font-weight: 700;
            text-align: center;
            white-space: nowrap;
            border-radius: .25rem;
    */

</script>
{#each projects as project}
<div>
    {project.projectName}
</div>
<Label value="HELLO" classes="bg-green-500 text-black w-4"/>
{/each}