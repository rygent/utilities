import { gql } from '../util/gql.js';

export const FuzzyDateFragment = gql`
	fragment FuzzyDateFragment on FuzzyDate {
		day
		month
		year
	}
`;
