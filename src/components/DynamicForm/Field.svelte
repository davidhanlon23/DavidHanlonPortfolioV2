<script lang="ts">
	import CheckBox from '../FormFields/Checkbox.svelte'
	import TextArea from '../FormFields/TextArea.svelte'
	import Input from '../FormFields/Input.svelte'

	export let objAttributes = {}

	const fieldComponents = {
		CheckBox: CheckBox,
		TextArea: TextArea,
		Input: Input
	}
</script>

<div>
	<svelte:component this={fieldComponents[objAttributes.fType]} {objAttributes} />
</div>
