import type { CharacterEntry, CharacterSearchOptions } from '../../types/character.js';
import { CharacterFragment } from '../fragments/character.js';
import { fetcher } from '../util/fetcher.js';
import { gql } from '../util/gql.js';

export class Character {
	public async get(id: number) {
		const query = gql`
			${CharacterFragment}
			query Query($id: Int) {
				Character(id: $id) {
					...CharacterFragment
				}
			}
		`;

		const data = await fetcher({ query, variables: { id } });

		return data.Character as CharacterEntry;
	}

	public async search(options: CharacterSearchOptions) {
		const query = gql`
			${CharacterFragment}
			query Query($search: String!, $page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					characters(search: $search) {
						...CharacterFragment
					}
				}
			}
		`;

		const data = await fetcher({
			query,
			variables: { search: options.search, page: options.page ?? 1, perPage: options.perPage ?? 20 }
		});

		return data.Page?.characters as CharacterEntry[];
	}
}
