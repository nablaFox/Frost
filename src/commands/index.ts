import type { Command } from 'commander'
import * as config from './config'
import * as select from './select'
import * as manage from './manage'

const commands = {
	...config,
	...select,
	...manage
}

export const load = (program: Command) => {
	Object.values(commands).forEach((command) => {
		program.addCommand(command)
	})

	return program
}

export default commands