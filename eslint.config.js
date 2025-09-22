import { defineConfig } from 'eslint/config';
import common from 'eslint-config-terrax/common';
import node from 'eslint-config-terrax/node';
import typescript from 'eslint-config-terrax/typescript';
import prettier from 'eslint-config-terrax/prettier';
import merge from 'lodash.merge';

const commonFiles = '{js,mjs,cjs,ts}';

const mainRulesets = [...common, ...node, ...typescript].map((config) =>
	merge(config, {
		files: [`**/*${commonFiles}`],
		languageOptions: {
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
				allowAutomaticSingleRunInference: true,
				project: ['tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'],
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			'no-restricted-globals': 'off'
		},
		settings: {
			'import-x/resolver': {
				typescript: {
					project: ['tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json']
				}
			}
		}
	})
);

const prettierRuleset = merge(...prettier, {
	files: [`**/*${commonFiles}`]
});

export default defineConfig(
	...mainRulesets,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		ignores: ['.git/', '**/dist/', '**/coverage/', '**/node_modules/']
	},
	{
		files: [`**/*${commonFiles}`],
		rules: {
			'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
			'n/prefer-global/process': ['warn', 'always'],
			'n/prefer-global/url': ['warn', 'always'],
			'n/prefer-global/url-search-params': ['warn', 'always']
		}
	},
	prettierRuleset
);
