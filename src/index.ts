import { program } from 'commander'
import { load } from './commands'
import { version, name } from 'package.json'

const cliName = name.split('-').shift() || name

program
	.name(cliName)
	.version(version)

load(program).parse()
