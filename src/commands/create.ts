import { createCommand } from 'commander'
import { $ } from 'execa'
import { error, log, success } from '@/display'
import { projectsPath } from '@/store'
import { createRepo } from '@/github'
import { store } from '@/store'
import fs from 'fs'
import prompts from 'prompts'

type Options = {
  nogit: boolean
  github: boolean
  private: boolean
}

const setGithubInfo = async (project: string, info: any) => {
	const github = `projects.${project}.github`

	Object.entries(info).forEach(([key, value]) => {
		store.set(`${github}.${key}`, value)
	})
}

const gitInit = async (project: string) => {
	process.chdir(`${projectsPath}/${project}`)

	await $`git init`
	await $`git add .`
	await $`git commit -m ${'first commit'}`
}

const createProject = async (project: string) => {
	const path = `${projectsPath}/${project}`

	if (project === 'path') {
		error('"path" is a reserved name')
		process.exit(1)
	}

	if (fs.existsSync(path)) {
		error('Project already exists')
		process.exit(1)
	}

	fs.mkdirSync(`${projectsPath}/${project}`)
	fs.writeFileSync(`${path}/README.md`, `# ${project}`)
}

const createGithubRepository = async (project: string) => {
	const {
		isPrivate,
		description,
		name
	} = await prompts([
		{
			type: 'text',
			name: 'name',
			message: 'Repository name',
			initial: project
		},
		{
			type: 'text',
			name: 'description',
			message: 'Repository description'
		},
		{
			type: 'confirm',
			name: 'isPrivate',
			message: 'Private repository?',
			initial: false
		}
	])

	const { data, err } = await createRepo(project, {
		private: isPrivate,
		description,
		name
	})

	if (err) {
		error(err.message)
		process.exit(1)
	}

	setGithubInfo(project, {
		repo: name,
		private: isPrivate,
		owner: data.owner.login
	})

	await $`git remote add origin ${data.clone_url}`
	await $`git push -u origin main`

	log(`\nProject repo created at ${data.html_url}`)
}

const action = async (project: string, options: Options) => {
	if (!project) {
		error('Empty project name')
		return
	}

	if (options.nogit && options.github) {
		error('You cannot use --nogit and --github at the same time')
		return
	}

	await createProject(project)

	if (!options.nogit) await gitInit(project)
	if (options.github) await createGithubRepository(project)

	success(`Project **${project}** created`)
}

export const create = createCommand('create')
	.description('Create a new project')
	.argument('[project]', 'the name of the project')
	.option('--nogit', 'do not initialize a git repository')
	.option('-G, --github', 'create a repository on GitHub')
	.action(action)