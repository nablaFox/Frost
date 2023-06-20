import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'

const treeshake = {
	moduleSideEffects: false,
	propertyReadSideEffects: false,
	tryCatchDeoptimization: false
}

const aliases = [
	{ find: '@', replacement: 'src' },
	{ find: '@@', replacement: '.' }
]

export default {
	input: 'src/index.ts',
	output: {
		chunkFileNames: 'shared/[name].js',
		dir: 'dist',
		entryFileNames: '[name].js',
		exports: 'named',
		format: 'cjs',
		interop: 'default'
	},
	plugins: [
		typescript({ exclude: 'node_modules/**' }),
		nodeResolve({
			preferBuiltins: true,
			exportConditions: ['node']
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		terser({
			compress: true,
			mangle: true
		}),
		alias({ entries: aliases }),
		json()
	],
	treeshake
}