import { name } from '@@/package.json'
import Configstore from 'configstore'

const store = new Configstore(name)

export { store }

export const githubToken = store.get('github.token')
export const projectsPath = store.get('projects.path')
export const editor = store.get('editor')

export const cliInitialized = githubToken !== undefined
  || projectsPath !== undefined
  || editor !== undefined