<script lang="ts">
	export let marginTop = ''
	export let marginBottom = ''
	export let vertical = false
</script>

<div class={`${marginTop} ${marginBottom}`}>
	<div class={`${vertical ? 'border-l' : 'border-b'} border-gray-200 dark:border-gray-700`} />
</div>
