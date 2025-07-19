# Anilist Wrapper

An UNOFFICIAL lightweight Node.js wrapper for Anilist GraphQL API written in typescript.

You can visit the official graphql docs for Anilist [here][anilist docs] to find out everything you can do.

> [!IMPORTANT]
>
> This project is still under development, not everything supported yet.

## Installation

```sh
# NPM
npm i @rygent/anilist

# Yarn
yarn add @rygent/anilist

# PNPM
pnpm add @rygent/anilist
```

## Usage

```ts
import { Anilist } from '@rygent/anilist';

const anilist = new Anilist();

await anilist.media.search({ type: 'Anime', search: 'Cowboy Bebop' });
await anilist.media.search({ type: 'Manga', search: 'Naruto' });
```

> [!NOTE]
>
> -   **page**: This property is optional and the default value is `1`.
> -   **perPage**: This property is optional and the default value is `20`.

---

<!-- LINKS -->

[anilist docs]: https://docs.anilist.co/guide/introduction
