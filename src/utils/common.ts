import { Client, initClient } from '@urql/svelte'

export function graphQlClient(): Client {
	// Initialize our graphql client
	const client = initClient({
		url: import.meta.env.VITE_APOLLO_SERVER
	})
	return client
}
