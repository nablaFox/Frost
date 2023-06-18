import { vi, expect, describe, it } from 'vitest'
import { program } from 'commander'
import type { Command } from 'commander'
import cmd from '../src/commands'

const runCLI = (command: Command) => {
	program.addCommand(command)
	program.parse(['node', 'pmt', command.name()])
}

describe('commands', () => {
	describe('init', () => {
		it('should initialize the CLI', () => {
			const spy = vi.spyOn(console, 'log')
			runCLI(cmd.init)
			expect(program.commands.length).toBe(1)
			expect(spy).toHaveBeenCalledWith('init')
		})
	})
})