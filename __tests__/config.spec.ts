import { runCmd } from './utils'
import { store } from '@/store'

const initialize = () => {
	store.set('github.token', 'test')
	store.set('projects.path', 'test')
	store.set('editor', 'test')
}

describe('config commands', () => {
	afterEach(() => store.clear())
	beforeEach(() => store.clear())

	describe('init', () => {
		it('should prompt the user for configuration values', async () => {
			const { res } = await runCmd('init', [
				'test1',
				'test2',
				'test3'
			])

			expect(res).toContain('Your GitHub token')
			expect(res).toContain('Where do you want to save your projects?')
			expect(res).toContain('What\'s your editor?')
			expect(res).toContain('Done! CLI initialized')

			const initialized = store.get('github.token') !== undefined
				&& store.get('projects.path') !== undefined
				&& store.get('editor') !== undefined

			expect(initialized).toBe(true)
		})

		it ('should avoid configuring if already initialized', async () => {
			store.set('github.token', 'test')

			const { err } = await runCmd('init')
			expect(err).toContain('CLI already initialized')
		})
	})

	describe('update', () => {
		it('should avoid updating if not initialized', async () => {
			const { err } = await runCmd('update github.token test')
			expect(err).toContain('CLI not initialized')
		})

		it('should update the configuration', async () => {
			initialize()
			const { res } = await runCmd('update github.token test1')
			expect(res).toContain('github.token: test --> test1')
		})

		it('should avoid updating if config is invalid', async () => {
			initialize()
			const { err } = await runCmd('update test test')
			expect(err).toContain('Invalid config')
		})
	})
})