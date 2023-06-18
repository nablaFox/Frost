import { createCommand } from 'commander'

export const select = createCommand('select')
	.description('Select a project')
	.argument('[project]', 'the name of the project')
	.action((project) => {
		console.log('select', project)
	})

export const selected = createCommand('selected')
	.description('Show the selected project')
	.action(() => {
		console.log('selected')
	})