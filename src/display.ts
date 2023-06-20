import { errorColor, successColor } from './settings'
import chalk from 'chalk'

const format = (message: string) => {
	// convert all the text between ** ** to bold
	return message.replace(/\*\*(.*?)\*\*/g, (_, text) => chalk.bold(text))
}

export const log = (message: string) => {
	message = format(message)
	console.log(message)
}

export const error = (message: string, errorMessage = 'Error') => {
	const err = chalk.bold.hex(errorColor)
	message = format(message)
	console.error(`\n${err(errorMessage)}: ${message}`)
}

export const success = (message: string, successMessage = 'Done') => {
	const succ = chalk.bold.hex(successColor)
	log(`\n${succ(successMessage)}! ${message}`)
}