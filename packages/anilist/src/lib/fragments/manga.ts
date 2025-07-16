import { CharacterSort } from '../../types/anilist.js';
import { gql } from '../util/gql.js';
import { CharacterNameFragment } from './character.js';
import { FuzzyDateFragment } from './fuzzyDate.js';
import { MediaTitleFragment } from './media.js';

export const MangaFragment = gql`
	${CharacterNameFragment}
	${MediaTitleFragment}
	${FuzzyDateFragment}
	fragment MediaFragment on Media {
		id
		idMal
		title {
			...MediaTitleFragment
		}
		format
		status(version: 2)
		description
		startDate {
			...FuzzyDateFragment
		}
		endDate {
			...FuzzyDateFragment
		}
		chapters
		volumes
		countryOfOrigin
		source(version: 3)
		genres
		synonyms
		averageScore
		popularity
		favourites
		characters(sort: ${CharacterSort.Relevance}) {
			nodes {
				name {
					...CharacterNameFragment
				}
			}
		}
		isAdult
		externalLinks {
			type
			url
			site
		}
		siteUrl
		bannerImage
		coverImage {
			extraLarge
			large
			medium
		}
	}
`;
