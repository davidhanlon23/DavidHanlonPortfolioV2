<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Card from '../components/UI/Card/Card.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
	<div class="text-center">
		<div class="top-home-container">
			<div class="pt-28">
				<h1 class="text-homeHeaderColor text-5xl">
					Ready for <span class="dark:text-white">something different?</span>
				</h1>
				<div class="dark:text-white pt-12 pb-32" style="margin: 0em 20em;">
					Endeavors.tv is a platform that is <b
						>changing the status quo of livestreaming.</b
					> Forget waiting months or years, hoping to get noticed: just hop on, stream your
					games and instantly get all eyes on you. Sign your team up to a competitive or casual
					league. Participate in tournaments. Join a groundbreaking, rapidly growing community
					of other gamers and streamers like yourself.
				</div>
			</div>
		</div>
		<div class="bottom-home-container">
			<div class="flex mx-16">
				<div class="mr-8 flex-1 rounded-lg dark:bg-darkPrimary">
					<Card
						imgSrc="https://images.unsplash.com/photo-1622495894307-93143fc57155"
						imgClasses="rounded-t-lg"
						alt=""
						title="Grow your audience."
						content="Our platform is designed to help hungry streamers grow their audience. Forget waiting for your big break - with our KOTH league model, you can use your gaming prowess to win eyeballs."
					/>
				</div>
				<div class="mr-8 flex-1 rounded-lg dark:bg-darkPrimary">
					<Card
						imgSrc="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
						imgClasses="rounded-t-lg"
						alt=""
						title="Showcase your talent."
						content="If you're a standout, we'll help you get noticed. Talented streamers, skilled gamers, high-performing teams and trending leagues are launched to the top of the charts in our Freestyle section."
					/>
				</div>
				<div class="mr-8 flex-1 rounded-lg dark:bg-darkPrimary">
					<Card
						imgSrc="https://images.unsplash.com/photo-1622495894307-93143fc57155"
						imgClasses="rounded-t-lg"
						alt=""
						title="Find your tribe."
						content="Our platform is built by gamers, for gamers. Whatever content you're into, our robust Community search tools can help you find people who are on the same page. What you do from there is up to you!"
					/>
				</div>
				<div class="mr-8 flex-1 rounded-lg dark:bg-darkPrimary">
					<Card
						imgSrc="https://images.unsplash.com/photo-1622495894307-93143fc57155"
						imgClasses="rounded-t-lg"
						alt=""
						title="Play your way."
						content="Whether you prefer solo adventures or high-stakes competitions, we've got you covered. With our advanced team and leauge management tools, you can game whenever you want, however you want."
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.top-home-container {
		background: transparent linear-gradient(180deg, #0088b1 0%, #000000 100%) 0% 0% no-repeat
			padding-box;
	}

	.bottom-home-container {
		background: transparent linear-gradient(180deg, #000000 0%, #0088b1 100%) 0% 0% no-repeat
			padding-box;
	}
</style>
