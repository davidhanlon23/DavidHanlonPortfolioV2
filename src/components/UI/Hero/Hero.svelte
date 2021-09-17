<script lang="ts">
    // TODO: Add customizable height... height doesn't appear to work

    import HeroBackground from './HeroHelpers/HeroBackground.svelte';
    import HeroHeaders from './HeroHelpers/HeroHeaders.svelte';
    import HeroSubText from './HeroHelpers/HeroSubText.svelte';
    import HeroCTAs from './HeroHelpers/HeroCTAs.svelte';
    import HeroFooter from './HeroHelpers/HeroFooter.svelte';
    import { getDivHeight } from '../../../utils/common';
    export let backgroundImage = '';
    export let backgroundColor = '';
    export let backgroundImageDescription = '';
    export let heroObject = {
        primaryHeader: '',
        secondaryHeader: '',
        subText: '',
        cta: {},
        heroFooter: [],

    }; 
    export let overlay = '';
    export let children = undefined;
    export let backgroundHeight = '';
    export let heroHeight = '';

    heroHeight = getDivHeight(heroHeight);

    
 const overlayColor = overlay || 'bg-black';
 const overlayOpacity = backgroundImage ? 'opacity-50' : '';
 
</script>
<div class={`w-full bg-green-500 ${heroHeight} md:py-16 relative`}>
            {#if children }
                <svelte:component this={children} />
            {:else}
            <div class="absolute inset-0">
                <HeroBackground
                    backgroundImage={backgroundImage}
                    backgroundColor={backgroundColor}
                    backgroundHeight={backgroundHeight}
                    imageDescription={backgroundImageDescription}
                    overlayColor={overlayColor}
                    overlayOpacity={overlayOpacity}
                />
            </div>
            <div class="relative px-4 pt-16 sm:px-6 sm:pt-24 lg:pt-32 lg:px-8">
                <HeroHeaders heroPrimaryHeader={heroObject.primaryHeader} heroSecondaryHeader={heroObject.secondaryHeader} />
                <HeroSubText heroSubText={heroObject.subText} />
                <HeroCTAs heroObject={heroObject} />
                <HeroFooter children={heroObject.heroFooter} />
            </div>
            {/if}
  </div>