<script lang="ts">
	import Icon from '../../Icon/Icon.svelte'
	import Divider from '../Divider/Divider.svelte'
	import MoreOptions from '../Options/MoreOptions.svelte'
	import Label from '../Label/Label.svelte'

	export let title = ''
	export let leagueGame = ''
	export let teams = 0
	export let gameType = ''
	export let startDate = ''
	export let endDate = ''
	export let labels = []
	export let prize = null
	export let country = ''
	export let matchInfo = null
	export let playerSlotsOpen = 0
	export let teamSlotsOpen = 0
	export let icon = ''

	let dividerClasses = { marginTop: 'mt-4', marginBottom: 'mb-4' }
</script>

<div class="bg-gradient-to-t from-green-700 via-gray-800 to-gray-800 rounded-lg relative">
	<div class="flex">
		{#if icon}
			<div
				class="bg-red-500 m-auto -mt-8 w-16 h-16 flex items-center justify-center rounded-full"
				style="margin-left: 5.85em;"
			>
				<Icon name="facebook" color="white" classes="w-10" />
			</div>
		{/if}
		<MoreOptions>
			<ul>
				<li>
					<a href="/">All</a>
				</li>
				<li>
					<a href="/">Not Submitted</a>
				</li>
				<li>
					<a href="/">Accepted</a>
				</li>
				<li>
					<a href="/">Rejected</a>
				</li>
				<li>
					<a href="/">Under Review</a>
				</li>
				<li>
					<a href="/">Waitlisted</a>
				</li>
			</ul>
		</MoreOptions>
	</div>
	<div class="mt-4 text-center">
		<div class="text-lg no-wrap dark:text-white">{title}</div>
		<div class="dark:text-gray-500">{leagueGame}</div>
		<Divider {...dividerClasses} />
		<div class="font-medium dark:text-gray-300">
			{teams} Teams <span class="text-4xl">.</span>
			{gameType}
		</div>
		<div class="dark:text-gray-500">{startDate} - {endDate}</div>
		<div class="flex justify-evenly mt-4">
			<Label value={labels[0]} icon="discord" classes="bg-grey-500" />
			<Label value={prize.amount} icon="facebook" classes="bg-red-500" />
		</div>
		<Divider {...dividerClasses} />
		<div class="grid grid-cols-2 text-left px-4">
			<div class="dark:text-gray-300">Country</div>
			<div class="ml-4 dark:text-white">{country}</div>
			<div class="dark:text-gray-300">Match Day (s)</div>
			<div class="ml-4 dark:text-white">{matchInfo.day}</div>
			<div class="dark:text-gray-300">Match Time</div>
			<div class="ml-4 dark:text-white">{matchInfo.time}</div>
			{#if teamSlotsOpen}
				<div class="whitespace-nowrap dark:text-gray-300">Team Slots Open</div>
				<div class="ml-4 dark:text-white">{teamSlotsOpen}</div>
			{/if}
			{#if playerSlotsOpen}
				<div class="whitespace-nowrap dark:text-gray-300">Player Slots Open</div>
				<div class="ml-4 dark:text-white">{playerSlotsOpen}</div>
			{/if}
		</div>
	</div>
	<Divider {...dividerClasses} />
	<div class="text-center">
		<button class="px-4 py-1 mb-4 bg-primary rounded-full dark:text-white">LEARN MORE</button>
	</div>
</div>
