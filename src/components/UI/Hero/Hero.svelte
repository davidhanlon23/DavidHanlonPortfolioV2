<script lang="ts">
    // TODO: Add customizable height... height doesn't appear to work

    import HeroBackground from './HeroHelpers/HeroBackground.svelte';
    import HeroHeaders from './HeroHelpers/HeroHeaders.svelte';
    import HeroSubText from './HeroHelpers/HeroSubText.svelte';
    import HeroCTAs from './HeroHelpers/HeroCTAs.svelte';
    
    export let backgroundImage = '';
    export let backgroundColor = '';
    export let backgroundImageDescription = '';
    export let heroObject = {
        primaryHeader: '',
        secondaryHeader: '',
        subText: '',
        cta: {},

    }; 
    export let overlay = '';
    export let children = undefined;
    export let height = '';

    let heroHeight = '';
    switch (height) {
		case '100':
		    heroHeight = `h-screen`;
		    break;
		case '80':
		    heroHeight = `h-4/5	`;
		    break;
		case '75':
		    heroHeight = `h-3/4`;
		    break;
        case '50':
            heroHeight = `h-1/2`;	
		default:
		    heroHeight = `h-auto`;
	}

 
 const overlayColor = overlay || 'bg-sgPrimaryLight-500';
 const overlayOpacity = backgroundImage ? 'opacity-50' : '';

 
</script>
<div class={`w-full ${heroHeight} md:py-16`}>
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div class="">
        <div class="relative shadow-xl sm:overflow-hidden">
            {#if children }
                <svelte:component this={children} />
            {:else}
            <div class="absolute inset-0">
                <HeroBackground
                    backgroundImage={backgroundImage}
                    backgroundColor={backgroundColor}
                    imageDescription={backgroundImageDescription}
                    overlayColor={overlayColor}
                    overlayOpacity={overlayOpacity}
                />
            </div>
            <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <HeroHeaders heroPrimaryHeader={heroObject.primaryHeader} heroSecondaryHeader={heroObject.secondaryHeader} />
                <HeroSubText heroSubText={heroObject.subText} />
                <HeroCTAs heroObject={heroObject} />
            </div>
            {/if}
            
        </div>
      </div>
    </div>
  </div>