<script lang="ts">
	import Icon from '../UI/Icon/Icon.svelte'
	import Button from '../UI/Button/Button.svelte'
	import AddLink from '../UI/AddLink/AddLink.svelte'

	const socials = [
		{
			href: '/',
			name: 'Twitter'
		},
		{
			href: '/',
			name: 'Instagram'
		},
		{
			href: '/',
			name: 'Facebook'
		},
		{
			href: '/',
			name: 'Youtube'
		}
	]

	const borderClasses = 'ml-8 text-left border-l-2 dark:border-gray-400'
	const headerClasses = "dark:text-white dark:text-opacity-60"
	const learnMoreClasses = 'mt-2 tracking-tighter'
</script>

<footer class="dark:bg-black-100 py-4 px-20 text-center">
	<!-- <div class="grid grid-cols-5">
		<div class="grid-cols-4">
			<div class="grid grid-cols-2">
				<div class="text-left dark:text-white">
					<div class={headerClasses}>LEARN MORE</div>
					<div class={learnMoreClasses}>FAQ</div>
					<div class={learnMoreClasses}>Documentation</div>
					<div class={learnMoreClasses}>Terms and Conditions</div>
					<div class={learnMoreClasses}>Privacy Policy</div>
				</div>
				<div class="ml-16 text-left dark:text-white">
					<br />
					<div class={learnMoreClasses}>Our Team</div>
					<div class={learnMoreClasses}>Contact Us</div>
				</div>
			</div>
		</div> -->
		<!--Empty grid column for footer -->
		<!-- <div /> -->
		<!-- <div class="text-left">
			<div class={headerClasses}>JOIN OUR DISCORD!</div>
			<div class="flex my-4">
				<Icon name="discord" classes="flex items-center mr-8 w-96" color="primary" />
				<div class="text-sm dark:text-white">
					Our Discord server is a great place to meet the team, chat with us and become
					part of an exciting and rapidly growing community.
				</div>
			</div>
			<Button classes="mt-4 px-4 py-2 w-full bg-grey-700 text-white rounded-full text-sm"
				>Join our Discord</Button
			>
		</div>
		<div class={borderClasses}>
			<div class="ml-16">
				<div class={headerClasses}>JOIN OUR MAILING LIST</div>
				<div class="my-4 text-white">
					Join our mailing list to get updates on new features and exclusive offers.
				</div>
				<input
					placeholder="Enter your email..."
					class="mb-4 px-4 py-1 border-0 rounded-full w-full dark:bg-black-200 dark:text-white"
				/><br />
				<Button color="blue" size="massive"
					>Sign Up</Button
				>
			</div>
		</div>
		<div class={borderClasses}>
			<div class="ml-16">
				<div class={headerClasses}>FOLLOW US</div>
				<ul>
					{#each socials as social}
						<li class="mt-4">
							<AddLink
								to={social.href}
								classes="text-white flex items-center ml-2"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon
									name={social.name.toLowerCase()}
									classes="w-8 h-8"
									color="primary"
								/>
								<span class="ml-4">{social.name}</span>
							</AddLink>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div> -->
	<div class="mt-8 text-center dark:text-white">Endeavors.tv All rights reserved.</div>
	<Button color="blue" size="massive" > Sign Up</Button>
</footer>
