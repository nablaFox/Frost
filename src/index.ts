import { program } from 'commander'
import { load } from './commands'

const pkg = require('../package.json')

program
	.name('pmt')
	.version(pkg.version)

load(program).parse()
