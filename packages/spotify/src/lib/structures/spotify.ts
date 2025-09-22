import { fetcher } from '../util/fetcher.js';
import {
	type SpotifyBearerToken,
	type SearchForItemParameterObject,
	type SpotifyOauth2Result,
	type SpotifyOptions,
	type SearchResponse
} from '../../types/spotify.js';

export class Spotify {
	private readonly clientId: string;
	private readonly clientSecret: string;

	private bearer: SpotifyBearerToken = { token: null, expire: null };

	public constructor(options: SpotifyOptions) {
		this.clientId = options.id;
		this.clientSecret = options.secret;
	}

	/**
	 * Searches for items on Spotify such as tracks, playlists, artists, or albums.
	 *
	 * @param {Object} params - The search parameters.
	 * @param {string} params.type - The type of items to search for (e.g., track, album).
	 * @param {string} params.query - The search query string.
	 * @param {number} [params.offset=0] - The index of the first result to return.
	 * @param {number} [params.limit=20] - The maximum number of results to return.
	 *
	 * @returns {Promise<SearchResponse>} A promise that resolves to the search results.
	 *
	 * @throws {Error} If the request to the Spotify API fails.
	 */
	public async search({ type, query, offset = 0, limit = 20 }: SearchForItemParameterObject): Promise<SearchResponse> {
		const accessToken = await this.getAccessToken();

		const res = await fetcher<SearchResponse>(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&offset=${offset}&limit=${limit}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		return res;
	}

	/**
	 * Retrieves the current bearer token for the client. If the token does not exist or has expired, it will automatically generate a new one.
	 * @returns The bearer token if it exists, otherwise a promise that resolves to a new bearer token.
	 * @throws {Error} If the request to the Spotify API fails.
	 */
	private getAccessToken(): string | Promise<string> {
		const { token, expire } = this.bearer;
		if (!expire || !token) return this.generateBearerToken();
		if (Date.now() > expire) return this.generateBearerToken();
		return token;
	}

	/**
	 * Generates a new bearer token for the client.
	 * @returns The bearer token.
	 * @throws {Error} If the request to the Spotify API fails.
	 */
	private async generateBearerToken(): Promise<string> {
		const res = await fetcher<SpotifyOauth2Result>('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: this.clientId,
				client_secret: this.clientSecret
			})
		});

		this.bearer = { token: res.access_token, expire: Date.now() + res.expires_in * 1e3 };
		return res.access_token;
	}
}
