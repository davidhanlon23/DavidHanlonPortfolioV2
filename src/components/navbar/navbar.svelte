<script lang="ts">
	import Toggle from '../Toggle/Toggle.svelte'
	import Popup from '../UI/Popup/Popup.svelte'
	import DynamicForm from '../DynamicForm/DynamicForm.svelte'

	export let isDarkMode: boolean

	const navBarClasses =
		'ml-4 dark:text-gray-300 text-xl hover:no-underline  hover:border-b-2 hover:border-primary'
</script>

<nav class="flex justify-between dark:bg-darkPrimary px-4 py-2">
	<div>
		<div class="flex">
			<a class="mr-2 text-2xl dark:text-white" href="/">endeavors.tv</a>
			<Toggle bind:isDarkMode />
		</div>
		<p class="text-right italic dark:text-white">Pre-alpha</p>
	</div>
	<div>
		<a href="/freestyle" class={navBarClasses}>Freestyle</a>
		<a href="/koth" class={navBarClasses}>King of the Hill</a>
		<a href="/leagues" class={navBarClasses}>Leagues</a>
		<a href="/teams" class={navBarClasses}>Teams</a>
		<a href="/community" class={navBarClasses}>Community</a>
	</div>
	<div>
		<Popup
			modalValue="Login"
			containerClasses="rounded-full py-1 px-4 dark:bg-gray-400 dark:text-white"
		>
			<div class="text-center dark:bg-gray-400">
				<div class="text-3xl dark:text-primary">Log In</div>
				<div class="dark:text-white">
					Don't have an account yet? <span class="dark:text-primary">Sign up now.</span>
				</div>
				<DynamicForm />
				<div class="dark:text-primary">Trouble logging in?</div>
			</div>
		</Popup>
		<button class="ml-2 rounded-full py-1 px-4 dark:bg-gray-400 dark:text-white">Sign Up</button
		>
	</div>
</nav>
