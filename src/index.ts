import { program } from 'commander'
import { load } from './commands'
import { version, name } from 'package.json'

program
	.name(name)
	.version(version)

load(program).parse()
