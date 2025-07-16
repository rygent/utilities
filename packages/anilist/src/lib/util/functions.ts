// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { FuzzyDate, Media } from '../../types/anilist.js';
import { decode } from 'html-entities';

const excessiveNewLinesRegex = /\n{3,}/g;

const htmlEntityRegex = /<\/?(i|b|br|strong)>/g;

const htmlEntityReplacements = Object.freeze({
	i: '',
	em: '',
	var: '',
	b: '',
	br: '\n',
	code: '',
	pre: '',
	mark: '',
	kbd: '',
	s: '',
	wbr: '',
	u: '',
	strong: ''
} as const);

export function parseHtmlEntity(source: string | null | undefined) {
	if (source === null) return source;

	const decodedHtml = decode(
		source?.replace(htmlEntityRegex, (_, type: keyof typeof htmlEntityReplacements) => htmlEntityReplacements[type])
	);

	return decodedHtml.replace(excessiveNewLinesRegex, '\n\n');
}

export function convertDate(fuzzyDate: FuzzyDate) {
	if (!fuzzyDate || fuzzyDate.day === null || fuzzyDate.month === null) return null;

	const date = new Date(fuzzyDate.year ?? 2000, fuzzyDate.month! - 1, fuzzyDate.day);
	const month = date.toLocaleString('default', { month: 'short' });
	const day = String(date.getDate()).padStart(2, '0');

	if (fuzzyDate.year === null) {
		return `${month} ${day}`;
	}

	return `${month} ${day}, ${fuzzyDate.year}`;
}

/**
 * Formats the media data to read better.
 */
export function formatMedia(media: Media) {
	media.description = parseHtmlEntity(media.description);

	if (!media.synonyms?.length) {
		media.synonyms = null;
	}

	media.startDate = convertDate(media.startDate);
	media.endDate = convertDate(media.endDate);

	if (media.characters) {
		media.characters = media.characters.nodes;
	}

	if (media.studios) {
		media.studios = media.studios.nodes;
	}

	return media;
}
