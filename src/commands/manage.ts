import { createCommand } from 'commander'

export const list = createCommand('list')
	.description('List all projects')
	.action(() => {
		console.log('list')
	})

export const create = createCommand('create')
	.description('Create a new project')
	.argument('[project]', 'the name of the project')
	.action((project) => {
		console.log('create', project)
	})

export const remove = createCommand('remove')
	.description('Remove a project')
	.argument('[project]', 'the name of the project')
	.action((project) => {
		console.log('remove', project)
	})

export const open = createCommand('open')
	.description('Open the selected project')
	.action(() => {
		console.log('open')
	})
