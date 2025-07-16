import type { Character, Media, MediaType, Studio } from './anilist.js';

export interface MediaSearchOptions {
	type: keyof typeof MediaType;
	search: string;
	page?: number;
	perPage?: number;
}

export interface MediaEntry extends Omit<Media, 'characters' | 'endDate' | 'startDate' | 'studios'> {
	/** The characters in the media */
	characters?: Character[] | null;
	/** The last official release date of the media */
	endDate?: number | null;
	/** The first official release date of the media */
	startDate?: number | null;
	/** The companies who produced the media */
	studios?: Studio[] | null;
}
