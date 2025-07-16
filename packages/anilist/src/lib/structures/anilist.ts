import { Character } from './character.js';
import { Media } from './media.js';

export class Anilist {
	public character: Character;
	public media: Media;

	public constructor() {
		this.character = new Character();
		this.media = new Media();
	}
}
