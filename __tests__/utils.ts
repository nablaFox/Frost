import { execa } from 'execa'
import { name } from '@/settings'

type CmdOutput = {
	err?: string,
	res?: string
}

export const runCmd = async (
	command: string,
	inputs?: string[],
	timeout = 100
) : Promise<CmdOutput> => {
	const params = [name, command.split(' ')] as [string, string[]]

	if (!inputs?.length) {
		const { stdout, stderr } = await execa(...params)
		return { res: stdout, err: stderr }
	}

	const { stdout, stdin } = execa(...params)

	let output = ''
	stdout?.on('data', data => output += data)

	return new Promise((resolve, reject) => {
		inputs.forEach((input, i) => {
			setTimeout(() => {
				stdin?.write(input + '\n')
				stdin?.on('error', () => reject({ err: output }))
				i === inputs.length - 1 && setTimeout(() => resolve({ res: output }), timeout)
			}, timeout * i)
		})
	})
}