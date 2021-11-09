<script lang="ts">
    import Image from '../UI/Image/Image.svelte';
    import Container from '../UI/Container/Container.svelte';
    import Icon from '../UI/Icon/Icon.svelte';

    export let sections = [
                {
                    sectionName:"",
                    sectionEducation: [
                        {
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
                                    educationsLogoAlt:"",
                                },
                            ],
                        },
                    ]
                },
    ];
    const secondaryHeaderClasses = "text-black dark:text-white font-semibold text-2xl my-8";
    const nameOfExperienceClasses = "text-black dark:text-white text-4xl hover:cursor-pointer hover:no-underline";
    const educationTaglinClasses = "text-black dark:text-white";
    const iconTextClasses = "ml-4 text-black dark:text-white"

</script>
{#each sections as section}
    <Container>
        <h2 class={`${secondaryHeaderClasses}`}>{section.sectionName}</h2>
    </Container>
    {#each section.sectionEducation as education}
        <Container>
            <!-- <div class="flex my-4">
                <Icon classes="w-6 h-6" name="calendar" color="primary" solid />
                <p class={iconTextClasses}>{education.educationDates}</p>
            </div>
            <div class="flex my-4">
                <Icon classes="w-6 h-6" name="academic-cap" color="primary" solid />
                <p class={iconTextClasses}>{education.educationGPA}</p>
            </div> -->
            {#each education.education as school}
                <div class="flex flex-col md:grid md:grid-cols-2 md:w-full mt-8">
                    <div class="md:w-full">
                        <h4>
                            <a href={school.educationsWebsite} class={`${nameOfExperienceClasses} ${school.educationNameClasses}`} target="_blank" aria-label={school.educationsWebsiteAriaLabel}>
                                {school.educationName}
                            </a>
                        </h4>
                        <p class={`${educationTaglinClasses}`}>{school.educationTagline}</p>
                        <div class="flex my-4">
                            <Icon classes="w-6 h-6" name="calendar" color="primary" solid />
                            <p class={iconTextClasses}>{education.educationDates}</p>
                        </div>
                        <div class="flex my-4">
                            <Icon classes="w-6 h-6" name="academic-cap" color="primary" solid />
                            <p class={iconTextClasses}>{education.educationGPA}</p>
                        </div>
                    </div>
                    <div class="flex justify-center mt-8 md:mt-0 md:justify-end md:w-full">
                        <Image classes="w-60 h-60" src={school.educationsLogo} alt={school.educationsLogoAlt} />
                    </div>
                </div>
            {/each}
            
        </Container>
    {/each}          
    
{/each}