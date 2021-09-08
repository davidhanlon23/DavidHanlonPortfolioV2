<script lang="ts">
    export let margin = '';
    export let padding = '';
    export let className = '';

  let p = '';
  let m = '';

  if (padding === 'small') {
    p = `px-1`;
  } else if (padding === 'medium') {
    p = `px-2`;
  } else if (padding === 'large') {
    p = `px-4 md:px-8`;
  } else if (padding === 'xlarge') {
    p = `px-4 md:px-12`;
  } else if (padding === 'none') {
    p = `px-0`;
  }

  if (margin === 'xsmall') {
    m = `my-2`;
  } else if (margin === 'small') {
    m = `my-4`;
  } else if (margin === 'medium') {
    m = `my-4 md:my-8`;
  } else if (margin === 'large') {
    m = `my-12 md:my-24`;
  } else if (margin === 'xlarge') {
    m = `my-24 md:my-48`;
  } else if (margin === 'none') {
    m = `my-0`;
  }
</script>
<div class={`container mx-auto ${p} ${m} ${className || ''}`}><slot/></div>;