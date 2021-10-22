<script lang="ts">
    import Image from '../UI/Image/Image.svelte';
    import Container from '../UI/Container/Container.svelte';
    import Icon from '../UI/Icon/Icon.svelte';
import { educationObject } from './education.enum';

    export let sections = [
                {
                    sectionName:"",
                    sectionEducation: [
                        {
                            educationType: "",
                            educationDates: "",
                            educationGPA:"",
                            education: [
                                {
                                    educationName:"",
                                    educationNameClasses: "",
                                    educationTagline:``,
                                    educationsWebsite:"",
                                    educationsWebsiteAriaLabel:"",
                                    educationsLogo:"",
                                },
                            ],
                        },
                    ]
                },
    ];
    const secondaryHeaderClasses = "text-black dark:text-white font-semibold text-2xl mt-8";
    const nameOfExperienceClasses = "text-black dark:text-white text-4xl hover:cursor-pointer hover:no-underline";

</script>
{#each sections as section}
    <Container>
        <h2 class={`${secondaryHeaderClasses}`}>{section.sectionName}</h2>
    </Container>
    {#each section.sectionEducation as education}
        <Container>
            <h3 class="">{education.educationType}</h3>
            <div class="flex">
                <Icon classes="w-6 h-6" name="calendar" color="primary" solid />
                <p>{education.educationDates}</p>
            </div>
            <div class="flex">
                <Icon classes="w-6 h-6" name="academic-cap" color="primary" />
                <p>{education.educationGPA}</p>
            </div>
            {#each education.education as school}
                <div class="flex">
                    <div>
                            <h4>
                                <a href={school.educationsWebsite} class={`${nameOfExperienceClasses} ${school.educationNameClasses}`} target="_blank" aria-label={school.educationsWebsiteAriaLabel}>
                                    {school.educationName}
                                </a>
                            </h4>
                            <p>{school.educationTagline}</p>
                    </div>
                    <div>
                        <Image classes="w-60 h-60" src={school.educationsLogo} />
                    </div>
                </div>

            {/each}
            
        </Container>
    {/each}          
    
{/each}