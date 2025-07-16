import { type Query } from '../../types/anilist.js';
import { formatMedia, parseHtmlEntity } from './functions.js';

export async function fetcher(options: { query: string; variables: unknown }): Promise<Query> {
	const controller = new AbortController();
	const requestTimeout = setTimeout(() => {
		controller.abort();
	}, 15000);

	const res = await fetch('https://graphql.anilist.co', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ query: options.query, variables: options.variables }),
		signal: controller.signal
	}).finally(() => clearTimeout(requestTimeout));

	if (!res.ok) {
		throw new Error(`Received status ${res.status} (${res.statusText})`);
	}

	const result = await res.json();
	const data = result.data as Query;

	if (data.Character) {
		data.Character.description = parseHtmlEntity(data.Character.description);
	}

	if (data.Media) {
		formatMedia(data.Media);
	}

	if (data.Page) {
		if (data.Page.media) {
			data.Page.media.forEach((media) => {
				if (media) {
					formatMedia(media);
				}
			});
		}

		if (data.Page.characters) {
			data.Page.characters.forEach((character) => {
				if (character) {
					character.description = parseHtmlEntity(character.description);
				}
			});
		}
	}

	return data;
}
