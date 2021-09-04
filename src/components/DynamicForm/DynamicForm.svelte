<script lang="ts">
	/*
  @abstract This app is used to demonstrate one way to track form state with Svelte.
  We use the 'store' to save an object that will contain our form field configurations
  and field values. A JSON string formatted configuration is used as opposed to a purely javascipt object so that we can for instance pull in our form configuration from a back-end database to dynmaically build our form (in this example we are simply hard-coding the JSON into the app, but for production you might want to pull from an server-side API).
  */
	import Field from './Field.svelte' // used to build our form fields
	import { storeFE } from '../../stores/store' // store our form state

	let objForm // @testing - used to listen for changes in our form state

	// opting for JSON string config (which is what we would want if we are pulling this config from say a server data API)
	// the 'fIndex' value is used within our form components know which form element object to work with within our main 'storeFE' object store. the 'fType' value tells the Field.svelte component which form element to build
	let objFormConfig = JSON.parse(`{
    "formElements": [
      {
          "fIndex":0,
          "fId":"cc2",
          "fType": "CheckBox",
          "fValue": "true",
          "fDisable":"ct1.fValue==''"
      },
      {
          "fIndex":1,
          "fId":"ct1",
          "fType": "TextArea",
          "fValue": "textee area",
          "fChangeEvent":"cc2 disable",
          "fDisable":"cc2 checked is false"
      },
      {
          "fIndex":2,
          "fId":"cc2",
          "fType": "Input",
          "fValue": "Input",
          "fLabel": "Username",
          "fDisable":"ct1.fValue==''"
      },
      {
          "fIndex":3,
          "fId":"cc2",
          "fType": "Input",
          "fValue": "Input",
          "fLabel": "Password",
          "fDisable":"ct1.fValue==''"
      }
    ]
  }`)
	// @testing: let us know when the form values have changed (the storeFE object has updated)
	$: {
		console.log('objForm:')
		console.log(objForm)
	}
	$storeFE = objFormConfig // save the initial form configuration to the store
</script>

NOTE: For another example of this code, that includes form validation, visit this Svelte REPL: <a
	href="https://svelte.dev/repl/253ddd578806497b8b54c339490f8221?version=3.21.0"
	>https://svelte.dev/repl/253ddd578806497b8b54c339490f8221?version=3.21.0</a
>
<form>
	{#each objFormConfig.formElements as item}
		<div>
			<Field objAttributes={item} />
		</div>
	{/each}
</form>
