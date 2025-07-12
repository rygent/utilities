/** Media Airing Schedule. NOTE: We only aim to guarantee that FUTURE airing data is present and accurate. */
export interface AiringSchedule {
	/** The time the episode airs at */
	airingAt: number;
	/** The airing episode number */
	episode: number;
	/** Seconds until episode starts airing */
	timeUntilAiring: number;
}

/** A character that features in an anime or manga */
export interface Character {
	/** The id of the character */
	id: number;
	/** The names of the character */
	name?: CharacterName | null;
	/** A general description of the character */
	description?: string | null;
	/** The character's gender. Usually Male, Female, or Non-binary but can be any string. */
	gender?: string | null;
	/** The character's birth date */
	dateOfBirth?: FuzzyDate | null;
	/** The character's age. Note this is a string, not an int, it may contain further text and additional ages. */
	age?: string | null;
	/** The characters blood type */
	bloodType?: string | null;
	/** Character images */
	image?: CharacterImage | null;
	/** The url for the character page on the AniList website */
	siteUrl?: string | null;
}

export interface CharacterConnection {
	nodes?: Pick<Character, 'name'>[] | null;
}

export interface CharacterImage {
	/** The character's image of media at its largest size */
	large?: string | null;
	/** The character's image of media at medium size */
	medium?: string | null;
}

/** The names of the character */
export interface CharacterName {
	/** Other names the character might be referred to as */
	alternative?: string[] | null;
	/** Other names the character might be referred to as but are spoilers */
	alternativeSpoiler?: string[] | null;
	/** The character's given name */
	first?: string | null;
	/** The character's first and last name */
	full?: string | null;
	/** The character's surname */
	last?: string | null;
	/** The character's middle name */
	middle?: string | null;
	/** The character's full name in their native language */
	native?: string | null;
	/** The currently authenticated users preferred name language. Default romaji for non-authenticated */
	userPreferred?: string | null;
}

/** The role the character plays in the media */
export enum CharacterRole {
	/** A background character in the media */
	Background = 'BACKGROUND',
	/** A primary character role in the media */
	Main = 'MAIN',
	/** A supporting character role in the media */
	Supporting = 'SUPPORTING'
}

/** Character sort enums */
export enum CharacterSort {
	Favourites = 'FAVOURITES',
	FavouritesDesc = 'FAVOURITES_DESC',
	Id = 'ID',
	IdDesc = 'ID_DESC',
	/** Order manually decided by moderators */
	Relevance = 'RELEVANCE',
	Role = 'ROLE',
	RoleDesc = 'ROLE_DESC',
	SearchMatch = 'SEARCH_MATCH'
}

export enum ExternalLinkType {
	Info = 'INFO',
	Social = 'SOCIAL',
	Streaming = 'STREAMING'
}

/** Date object that allows for incomplete date values (fuzzy) */
export interface FuzzyDate {
	/** Numeric Day (24) */
	day?: number | null;
	/** Numeric Month (3) */
	month?: number | null;
	/** Numeric Year (2017) */
	year?: number | null;
}

/** Anime or Manga */
export interface Media {
	/** The id of the media */
	id: number;
	/** The mal id of the media */
	idMal?: number | null;
	/** The official titles of the media in various languages */
	title?: MediaTitle | null;
	/** The format the media was released in */
	format?: MediaFormat | null;
	/** The current releasing status of the media */
	status?: MediaStatus | null;
	/** Short description of the media's story and characters */
	description?: string | null;
	/** The first official release date of the media */
	startDate?: FuzzyDate | null;
	/** The last official release date of the media */
	endDate?: FuzzyDate | null;
	/** The season the media was initially released in */
	season?: MediaSeason | null;
	/** The season year the media was initially released in */
	seasonYear?: number | null;
	/** The amount of episodes the anime has when complete */
	episodes?: number | null;
	/** The general length of each anime episode in minutes */
	duration?: number | null;
	/** The media's next episode airing schedule */
	nextAiringEpisode?: AiringSchedule | null;
	/** The amount of chapters the manga has when complete */
	chapters?: number | null;
	/** The amount of volumes the manga has when complete */
	volumes?: number | null;
	/** Where the media was created. (ISO 3166-1 alpha-2) */
	countryOfOrigin?: string | null;
	/** Source type the media was adapted from. */
	source?: MediaSource | null;
	/** The genres of the media */
	genres?: string[] | null;
	/** Alternative titles of the media */
	synonyms?: string[] | null;
	/** A weighted average score of all the user's scores of the media */
	averageScore?: number | null;
	/** The number of users with the media on their list */
	popularity?: number | null;
	/** The amount of user's who have favourited the media */
	favourites?: number | null;
	/** The characters in the media */
	characters?: CharacterConnection | null;
	/** The companies who produced the media */
	studios?: StudioConnection | null;
	/** If the media is intended only for 18+ adult audiences */
	isAdult?: boolean | null;
	/** External links to another site related to the media */
	externalLinks?: MediaExternalLink[] | null;
	/** The url for the media page on the AniList website */
	siteUrl?: string | null;

	/** The banner image of the media */
	bannerImage?: string | null;
	/** The cover images of the media */
	coverImage?: MediaCoverImage | null;
	/** Media trailer or advertisement */
	trailer?: MediaTrailer | null;
}

export interface MediaCoverImage {
	/** The cover image url of the media at its largest size. If this size isn't available, large will be provided instead. */
	extraLarge?: string | null;
	/** The cover image url of the media at a large size */
	large?: string | null;
	/** The cover image url of the media at medium size */
	medium?: string | null;
}

/** An external link to another site related to the media or staff member */
export interface MediaExternalLink {
	/** The links website site name */
	site: string;
	type?: ExternalLinkType | null;
	/** The url of the external link or base url of link source */
	url?: string | null;
}

/** The format the media was released in */
export enum MediaFormat {
	/** Professionally published manga with more than one chapter */
	Manga = 'MANGA',
	/** Anime movies with a theatrical release */
	Movie = 'MOVIE',
	/** Short anime released as a music video */
	Music = 'MUSIC',
	/** Written books released as a series of light novels */
	Novel = 'NOVEL',
	/** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */
	Ona = 'ONA',
	/** Manga with just one chapter */
	OneShot = 'ONE_SHOT',
	/** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */
	Ova = 'OVA',
	/** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */
	Special = 'SPECIAL',
	/** Anime broadcast on television */
	Tv = 'TV',
	/** Anime which are under 15 minutes in length and broadcast on television */
	TvShort = 'TV_SHORT'
}

export enum MediaSeason {
	/** Months September to November */
	Fall = 'FALL',
	/** Months March to May */
	Spring = 'SPRING',
	/** Months June to August */
	Summer = 'SUMMER',
	/** Months December to February */
	Winter = 'WINTER'
}

/** Source type the media was adapted from */
export enum MediaSource {
	/** Version 2+ only. Japanese Anime */
	Anime = 'ANIME',
	/** Version 3 only. Comics excluding manga */
	Comic = 'COMIC',
	/** Version 2+ only. Self-published works */
	Doujinshi = 'DOUJINSHI',
	/** Version 3 only. Games excluding video games */
	Game = 'GAME',
	/** Written work published in volumes */
	LightNovel = 'LIGHT_NOVEL',
	/** Version 3 only. Live action media such as movies or TV show */
	LiveAction = 'LIVE_ACTION',
	/** Asian comic book */
	Manga = 'MANGA',
	/** Version 3 only. Multimedia project */
	MultimediaProject = 'MULTIMEDIA_PROJECT',
	/** Version 2+ only. Written works not published in volumes */
	Novel = 'NOVEL',
	/** An original production not based of another work */
	Original = 'ORIGINAL',
	/** Other */
	Other = 'OTHER',
	/** Version 3 only. Picture book */
	PictureBook = 'PICTURE_BOOK',
	/** Video game */
	VideoGame = 'VIDEO_GAME',
	/** Video game driven primary by text and narrative */
	VisualNovel = 'VISUAL_NOVEL',
	/** Version 3 only. Written works published online */
	WebNovel = 'WEB_NOVEL'
}

/** The current releasing status of the media */
export enum MediaStatus {
	/** Ended before the work could be finished */
	Cancelled = 'CANCELLED',
	/** Has completed and is no longer being released */
	Finished = 'FINISHED',
	/** Version 2 only. Is currently paused from releasing and will resume at a later date */
	Hiatus = 'HIATUS',
	/** To be released at a later date */
	NotYetReleased = 'NOT_YET_RELEASED',
	/** Currently releasing */
	Releasing = 'RELEASING'
}

/** The official titles of the media in various languages */
export interface MediaTitle {
	/** The official english title */
	english?: string | null;
	/** Official title in it's native language */
	native?: string | null;
	/** The romanization of the native language title */
	romaji?: string | null;
	/** The currently authenticated users preferred title language. Default romaji for non-authenticated */
	userPreferred?: string | null;
}

/** Media trailer or advertisement */
export interface MediaTrailer {
	/** The trailer video id */
	id?: string | null;
	/** The site the video is hosted by (Currently either youtube or dailymotion) */
	site?: string | null;
	/** The url for the thumbnail image of the video */
	thumbnail?: string | null;
}

/** Media type enum, anime or manga. */
export enum MediaType {
	/** Japanese Anime */
	Anime = 'ANIME',
	/** Asian comic */
	Manga = 'MANGA'
}

/** Page of data */
export interface Page {
	characters?: Character[] | null;
	media?: Media[] | null;
}

export interface Query {
	/** Character query */
	Character?: Character | null;
	/** Media query */
	Media?: Media | null;
	Page?: Page | null;
}

/** Animation or production company */
export interface Studio {
	/** The id of the studio */
	id: number;
	/** If the studio is an animation studio or a different kind of company */
	isAnimationStudio: boolean;
	/** The name of the studio */
	name: string;
	/** The url for the studio page on the AniList website */
	siteUrl?: string | null;
}

export interface StudioConnection {
	nodes?: Pick<Studio, 'name' | 'isAnimationStudio'>[] | null;
}

/** Studio sort enums */
export enum StudioSort {
	Favourites = 'FAVOURITES',
	FavouritesDesc = 'FAVOURITES_DESC',
	Id = 'ID',
	IdDesc = 'ID_DESC',
	Name = 'NAME',
	NameDesc = 'NAME_DESC',
	SearchMatch = 'SEARCH_MATCH'
}
