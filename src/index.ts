import { program } from 'commander'
import { load } from './commands'
import { version, name } from './settings'

program
	.name(name)
	.version(version)

load(program).parse()
