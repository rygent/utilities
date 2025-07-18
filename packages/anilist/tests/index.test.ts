import { describe, expect, it } from 'vitest';
import { Anilist } from '../src';

describe('Anilist API', () => {
	const anilist = new Anilist();

	it('should return anime info by id', async () => {
		const response = await anilist.media.anime(1);

		expect(response).toMatchObject({
			id: expect.any(Number)
		});
	});

	it('should return anime info by search', async () => {
		const response = await anilist.media.search({ type: 'Anime', search: 'Cowboy Bebop' });

		expect(response).toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					title: expect.objectContaining({ romaji: expect.any(String) })
				})
			])
		);
	});

	it('should return manga info by id', async () => {
		const response = await anilist.media.manga(105778);

		expect(response).toMatchObject({
			id: expect.any(Number)
		});
	});

	it('should return manga info by search', async () => {
		const response = await anilist.media.search({ type: 'Manga', search: 'Chainsaw Man' });

		expect(response).toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					title: expect.objectContaining({ romaji: expect.any(String) })
				})
			])
		);
	});

	it('should return character info by id', async () => {
		const response = await anilist.character.get(17);

		expect(response).toMatchObject({
			id: expect.any(Number)
		});
	});

	it('should return characters info by search', async () => {
		const response = await anilist.character.search({ search: 'Naruto' });

		expect(response).toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.objectContaining({ full: expect.any(String) })
				})
			])
		);
	});
});
