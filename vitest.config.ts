import { createVitestConfig } from './scripts/vitest.config';

export default createVitestConfig({
	test: {
		coverage: {
			exclude: ['**/scripts/**', 'commitlint.config.js', 'eslint.config.js', 'vitest.workspace.ts']
		},
		projects: [
			'./packages/anilist/vitest.config.ts',
			'./packages/igdb/vitest.config.ts',
			'./packages/spotify/vitest.config.ts'
		]
	},
	esbuild: {
		target: 'esnext'
	}
});
