import { CharacterSort, StudioSort } from '../../types/anilist.js';
import { gql } from '../util/gql.js';
import { CharacterNameFragment } from './character.js';
import { FuzzyDateFragment } from './fuzzyDate.js';
import { MediaTitleFragment } from './media.js';

export const AnimeFragment = gql`
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
		season
		seasonYear
		episodes
		duration
		nextAiringEpisode {
			airingAt
			episode
		}
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
		studios(sort: ${StudioSort.Name}, isMain: true) {
			nodes {
				name
				isAnimationStudio
			}
		}
		isAdult
		externalLinks {
			site
			type
			url
		}
		siteUrl
		bannerImage
		coverImage {
			extraLarge
			large
			medium
		}
		trailer {
			id
			site
			thumbnail
		}
	}
`;
