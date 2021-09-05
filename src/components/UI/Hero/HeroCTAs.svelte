<script lang="ts">
    import Button from "../Button/Button.svelte";

    export let heroObject;
    const primaryStyles = heroObject.cta && heroObject.cta.secondary ? 'sm:grid-cols-2' : 'sm:grid-cols-1';

</script>
      <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
        <div class={`space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:gap-5 ${primaryStyles}`}>
            {#if heroObject.cta && heroObject.cta.primary}
            <Button
            {...heroObject.cta.primary.functionality}
            color={heroObject.cta.primary.color}
            text={heroObject.cta.primary.text}
            className="w-full mx-auto mb-4 sm:mx-0 sm:mb-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  sm:px-8"
          />
            {/if}

            {#if heroObject.cta && heroObject.cta.secondary}
            <Button
              {...heroObject.cta.secondary.functionality}
              color={heroObject.cta.secondary.color}
              text={heroObject.cta.secondary.text}
              className="w-full mx-auto sm:mx-0 sm:w-auto flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm sm:px-8"
            />
            {/if}
        </div>
      </div>   