<script lang="ts">
    import Container from '../components/UI/Container/Container.svelte';
    import { projectsObject } from '../components/Projects/projects.enum';
    import ProjectSection from '../components/Projects/ProjectSection.svelte';
</script>
<div class="mt-16">
    <Container>
        <h1 class="pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center">Projects</h1>
    </Container>
    <div class="mt-8">
        <ProjectSection projects={projectsObject} />
    </div>
</div>