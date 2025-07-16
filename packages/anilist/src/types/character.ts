import type { Character } from './anilist.js';

export interface CharacterSearchOptions {
	search: string;
	page?: number;
	perPage?: number;
}

export interface CharacterEntry extends Omit<Character, 'dateOfBirth'> {
	/** The character's birth date */
	dateOfBirth?: string | null;
}
