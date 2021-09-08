<script>
	import { storeFE } from '../../../stores/store'

	export let objAttributes = {}

	const fIndex = objAttributes.fIndex

	console.log('textarea here, showing you my field attributes:', $storeFE)
	console.log(objAttributes)
</script>

<h2>My text</h2>
<textarea bind:value={$storeFE.formElements[fIndex].fValue} />
