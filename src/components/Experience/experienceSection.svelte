<script lang="ts">
    import Image from '../UI/Image/Image.svelte';
    import Container from '../UI/Container/Container.svelte';
    import Icon from '../UI/Icon/Icon.svelte';
    import Divider from '../UI/Divider/Divider.svelte';

    export let sections = [
                {
                   sectionName:"",
                   sectionExperience: [
                    {
                        experienceName: "",
                        experienceNameClasses: "",
                        experienceWebsite:"",
                        experienceTagline: "",
                        experiencePosition: "",
                        experienceDates: "",
                        experienceLocation: "",
                        experienceLogo: "",
                        experienceLogoAlt: "",
                        ariaLabel: "",
                        experienceItems: [
                            {
                                experience: "",
                            },
                            {
                                experience: "",
                            },
                        ],
                    },
                   ],
                },
    ];
    const secondaryHeaderClasses = "text-black dark:text-white font-semibold text-2xl mt-8";
    const nameOfExperienceClasses = "text-black dark:text-white text-4xl hover:cursor-pointer hover:no-underline";
    const taglineClasses = "italic text-black dark:text-white mt-2";
    const positionClasses = "text-black dark:text-white my-2 font-semibold";
    const dateAndLocationClasses = "text-black dark:text-white";
    const listClasses = "ml-4 list-disc dark:text-white";
    const logoClasses = "w-60 h-60";
    const iconClasses = "w-6 h-6 mx-4";
</script>
{#each sections as section}
    <Container>
        <h2 class={`${secondaryHeaderClasses}`}>{section.sectionName}</h2>
    </Container>
    {#each section.sectionExperience as experience}
        <Container>
            <div class="flex flex-col md:grid md:grid-cols-2 md:w-full mt-8">
                <div class="md:w-full">
                    <h3>
                        <a class={`${nameOfExperienceClasses} ${experience.experienceNameClasses || ''}`} target="_blank" href={experience.experienceWebsite} aria-label={experience.ariaLabel}>
                            {experience.experienceName}
                        </a>
                    </h3>
    
                    <p class={`${taglineClasses}`}>{experience.experienceTagline}</p>
                    <h4 class={`${positionClasses}`}>{experience.experiencePosition}</h4>
                    <div class="flex my-4">
                        <div class="flex">
                            <Icon classes={iconClasses} name="calendar" color="primary" solid />
                            <p class={`${dateAndLocationClasses}`}>{experience.experienceDates} </p>
                        </div>
                        <div class="flex">
                            <Icon classes={iconClasses} name="location" color="primary" solid />
                            <p class={`${dateAndLocationClasses}`}>{experience.experienceLocation}</p>
                        </div>
    
                    </div>
                    <ul class={`${listClasses}`}>
                        {#each experience.experienceItems as items}
                            <li>{items.experience}</li>
                        {/each}
                    </ul>
                </div>
                <div class="flex justify-start mt-8 md:mt-0 md:justify-end md:w-full">
                    <Image classes={logoClasses} src={`${experience.experienceLogo}`} alt={experience.experienceLogoAlt} />
                </div>
            </div>
        </Container>
    {/each}
    <Divider marginBottom="mb-8" marginTop="mt-8" />
{/each}
    