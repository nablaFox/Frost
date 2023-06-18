import { createCommand } from 'commander'

export const init = createCommand('init')
	.description('Initialize the CLI')
	.action(() => {
		console.log('init')
	})

export const update = createCommand('update')
	.description('Update the CLI config')
	.argument('[config]', 'the config to update')
	.argument('[value]', 'the value to update the config to')
	.action((config, value) => {
		console.log('update', config, value)
	})