import { githubToken } from '@/store'

export type RepoOptions = {
  private?: boolean
  description?: string
  name?: string
}

const endpoint = 'https://api.github.com'
const defaultHeaders = {
	'Authorization': `token ${githubToken}`,
	'Content-Type': 'application/json'
}

const request = async (path: string, body?: any, method?: string) => {
	const hasBody = body !== null

	try {
		const response = await fetch(`${endpoint}/${path}`, {
			headers: defaultHeaders,
			body: hasBody ? JSON.stringify(body) : undefined,
			method: method ?? (hasBody ? 'POST' : 'GET')
		})

		try {
			const data = await response.json()
			return { data }
		}
		catch { return { data: null } }
	} catch(err) {
		return { err }
	}
}

export const createRepo = async (name: string, options?: RepoOptions) => {
	return request('user/repos', {
		name,
		...options
	})
}

export const deleteRepo = async (owner: string, repo: string) => {
	return request(`repos/${owner}/${repo}`, null, 'DELETE')
}