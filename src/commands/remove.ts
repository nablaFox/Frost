import { createCommand } from 'commander'
import { projectsPath } from '@/store'
import { error, success } from '@/display'
import { deleteRepo } from '@/github'
import { store } from '@/store'
import fs from 'fs'

type RemoveOptions = {
	github: boolean
	all: boolean
}

const removeProject = (project: string) => {
	const path = `${projectsPath}/${project}`

	fs.rm(path, { recursive: true }, (err) => {
		if (err) return error(err.message)
		success(`Project **${project}** deleted`)
	})
}

const removeRepo = async (project: string) => {
	const github = store.get(`projects.${project}.github`)

	if (!github) return 'The project does not have a GitHub repository'

	const { err } = await deleteRepo(github.owner, github.repo)
	if (err) return err.message

	store.delete(`projects.${project}.github`)
	success('GitHub repository deleted')
}

const removeAction = async (project: string, options: RemoveOptions) => {
	if (!project) return

	if (options.github) {
		return await removeRepo(project)
	}

	if (!options.all) {
		return removeProject(project)
	}

	const err = await removeRepo(project)
	if (err) return error(err)
	removeProject(project)
}

export const remove = createCommand('remove')
	.description('Remove a project')
	.argument('[project]', 'The name project name')
	.option('-g, --github', 'Delete only the GitHub repository')
	.option('-a, --all', 'Delete the project locally and on GitHub')
	.action(removeAction)