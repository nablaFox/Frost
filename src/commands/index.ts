import type { Command } from 'commander'
import * as config from './config'
import * as create from './create'
import * as remove from './remove'
import * as select from './select'
import * as manage from './manage'

import { cliInitialized } from '@/store'
import { error, log } from '@/display'
import { name } from '@/settings'

const commands = {
	...config,
	...select,
	...manage,
	...create,
	...remove
}

export const load = (program: Command) => {
	Object.values(commands).forEach((command) => {
		program.addCommand(command)

		if (command.name() === 'init') return

		command.hook('preAction', () => {
			if (!cliInitialized) {
				error('CLI not initialized')
				log(`Run **${name} config init** to initialize the CLI`)
				process.exit(0)
			}
		})
	})

	return program
}

export default commands