import { createCommand } from 'commander'
import { projectsPath } from '@/store'
import { log } from '@/display'
import fs from 'fs'

type ListOptions = {
	local: boolean
}

const listAction = (options: ListOptions) => {
	const projects = fs.readdirSync(projectsPath)

	projects.forEach(project => {
		log(project)
	})
}

export const list = createCommand('list')
	.description('List all projects')
	.option('-l', '--local', 'Show only local projects')
	.action(listAction)

export const open = createCommand('open')
	.description('Open the selected project')
	.action(() => {
		console.log('open')
	})
