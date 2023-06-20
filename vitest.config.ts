import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/bin/**',
			'**/types/**',
			'__tests__/utils.ts'
		],
		globals: true
	},
	resolve: {
		alias: {
			'@': './src',
			'@@': '.'
		}
	}
})