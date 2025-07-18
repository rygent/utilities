import { gql } from '../util/gql.js';
import { FuzzyDateFragment } from './fuzzyDate.js';

export const CharacterNameFragment = gql`
	fragment CharacterNameFragment on CharacterName {
		alternative
		alternativeSpoiler
		first
		full
		last
		middle
		native
		userPreferred
	}
`;

export const CharacterFragment = gql`
	${CharacterNameFragment}
	${FuzzyDateFragment}
	fragment CharacterFragment on Character {
		id
		name {
			...CharacterNameFragment
		}
		description
		gender
		dateOfBirth {
			...FuzzyDateFragment
		}
		age
		bloodType
		image {
			large
			medium
		}
		siteUrl
	}
`;
