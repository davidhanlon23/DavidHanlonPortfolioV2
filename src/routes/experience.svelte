<script lang="ts">
    import Image from '../components/UI/Image/Image.svelte';
    import Container from '../components/UI/Container/Container.svelte';
    import Icon from '../components/UI/Icon/Icon.svelte';
    import Divider from '../components/UI/Divider/Divider.svelte';
    import ExperienceSection from '../components/Experience/experienceSection.svelte';
    import { experienceObject } from '../components/Experience/experience.enum';
    const secondaryHeaderClasses = "text-black dark:text-white font-semibold text-xl";
    const nameOfExperienceClasses = "text-black dark:text-white text-4xl";
    // const sectionClasses = "";
    // const taglineClasses = "italic"
    // const logoClasses = "w-60 h-60";
</script>
<div class="py-16">
    <Container>
        <h1 id="page-title" class="pt-16 text-5xl font-normal text-dh-secondary-dark-500 text-center">Experience</h1>        
    </Container>
    <ExperienceSection sections={experienceObject} />
</div>
