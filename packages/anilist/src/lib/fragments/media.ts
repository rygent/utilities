import { gql } from '../util/gql.js';

export const MediaTitleFragment = gql`
	fragment MediaTitleFragment on MediaTitle {
		english
		native
		romaji
		userPreferred
	}
`;
