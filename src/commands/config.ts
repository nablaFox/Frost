import { createCommand } from 'commander'
import { cliInitialized as initialized, store } from '@/store'
import { error, log, success } from '@/display'
import { name } from '@/settings'
import path from 'path'
import prompts from 'prompts'

const validate = (value: string, name: string) => value.length < 0
	? `Please enter a valid ${name}`
	: true

const configOptions = [
	'github.token',
	'projects.path',
	'editor'
]

const checkConfig = (config: string) => configOptions.includes(config)

const initAction = async () => {
	if (initialized) {
		error('CLI already initialized')
		log(`Run **${name} config update** to update the configuration`)
		return
	}

	const {
		githubToken,
		projectsPath,
		editor
	} = await prompts([
		{
			type: 'text',
			name: 'githubToken',
			message: 'Your GitHub token',
			validate: value => validate(value, 'GitHub token')
		},
		{
			type: 'text',
			name: 'projectsPath',
			message: 'Where do you want to save your projects?',
			initial: '~/projects',
			validate: value => validate(value, 'Path')
		},
		{
			type: 'text',
			name: 'editor',
			message: 'What\'s your editor?',
			validate: value => validate(value, 'Editor')
		}
	])

	if (!githubToken || !projectsPath || !editor) return

	const resolvedPath = projectsPath.replace(/^~(?=$|\/|\\)/, process.env.HOME || process.env.USERPROFILE || '')
	const absolutePath = path.resolve(resolvedPath)

	store.set('github.token', githubToken)
	store.set('projects.path', absolutePath)
	store.set('editor', editor)

	success('CLI initialized')
}

const updateAction = async (config: string, value: string) => {
	if (config === undefined) {
		error('Configuration to update not specified')
		return
	}

	if (!checkConfig(config)) {
		log('Available configurations:')
		configOptions.forEach(option => log(`- **${option}**`))
		error('Invalid configuration')
		return
	}

	if (value === undefined) {
		error('New configuration not specified')
		return
	}

	const previous = store.get(config)

	store.set(config, value)
	success(`${config}: **${previous}** --> **${value}**`)
}

const settingsAction = () => {
	configOptions.forEach(option => log(`- **${option}**: ${store.get(option)}`))
}

export const init = createCommand('init')
	.description('Initialize the CLI')
	.action(initAction)

export const update = createCommand('update')
	.description('Update the CLI config')
	.argument('[config]', 'the config to update')
	.argument('[value]', 'the value to update the config to')
	.action(updateAction)

export const configs = createCommand('settings')
	.description('See the CLI settings')
	.action(settingsAction)