import { program } from 'commander'

program
	.name('pmt')
	.description('CLI to help manage local projects efficiently')
	.version('0.0.1')
	.action(() => {
		console.log('default action')
	})

program.parse()