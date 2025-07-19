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
	/** The first official release date of the media */
	startDate?: string | null;
	/** The last official release date of the media */
	endDate?: string | null;
	/** The companies who produced the media */
	studios?: Studio[] | null;
}
