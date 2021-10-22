<script lang="ts">
    import Container from '../components/UI/Container/Container.svelte';
    import ExperienceSection from '../components/Experience/ExperienceSection.svelte';
    import EducationSection from '../components/Experience/EducationSection.svelte';
    import { experienceObject } from '../components/Experience/experience.enum';
    import { educationObject } from '../components/Experience/education.enum';

</script>
<div class="py-16">
    <Container>
        <h1 id="page-title" class="pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center">Experience</h1>        
    </Container>
    <ExperienceSection sections={experienceObject} />
    <EducationSection sections={educationObject} />
</div>
