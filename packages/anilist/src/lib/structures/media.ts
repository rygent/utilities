import { AnimeFragment } from '../fragments/anime.js';
import { MangaFragment } from '../fragments/manga.js';
import { MediaType } from '../../types/anilist.js';
import { type MediaEntry, type MediaSearchOptions } from '../../types/media.js';
import { fetcher } from '../util/fetcher.js';
import { gql } from '../util/gql.js';

export class Media {
	public async anime(id: number) {
		const query = gql`
			${AnimeFragment}
			query Query($id: Int) {
				Media(id: $id, type: ${MediaType.Anime}) {
					...MediaFragment
				}
			}
		`;

		const data = await fetcher({ query, variables: { id } });

		return data.Media as MediaEntry;
	}

	public async manga(id: number) {
		const query = gql`
			${MangaFragment}
			query Query($id: Int) {
				Media(id: $id, type: ${MediaType.Manga}) {
					...MediaFragment
				}
			}
		`;

		const data = await fetcher({ query, variables: { id } });

		return data.Media as MediaEntry;
	}

	public async search(options: MediaSearchOptions) {
		let MediaFragment;
		switch (options.type) {
			case 'Anime':
				MediaFragment = AnimeFragment;
				break;
			case 'Manga':
				MediaFragment = MangaFragment;
				break;
		}

		const query = gql`
			${MediaFragment}
			query Query($search: String!, $page: Int, $perPage: Int) {
				Page(page: $page, perPage: $perPage) {
					media(search: $search, type: ${MediaType[options.type]}) {
						...MediaFragment
					}
				}
			}
		`;

		const data = await fetcher({
			query,
			variables: { search: options.search, page: options.page ?? 1, perPage: options.perPage ?? 20 }
		});

		return data.Page?.media as MediaEntry[];
	}
}
