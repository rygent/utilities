import { format } from 'winston';
import { blackBright, italic, whiteBright } from 'colorette';
import { levelColors } from './constants.js';
import moment from 'moment';

function stackTrace(stack: string) {
	if (!stack) return '';

	return `\n${' '.repeat(4)}${stack.replace(/(\r\n|\n|\r)/gm, '$1  ')}`;
}

export function formatter(color: boolean) {
	return format.combine(
		format.timestamp(),
		format.printf(({ timestamp, level, message, ...info }) => {
			timestamp = moment(timestamp as string).format('DD/MM/YYYY HH:mm:ss z');
			level = color ? Reflect.get(levelColors, level)(level.toUpperCase()) : level.toUpperCase();

			const messages = [`${color ? blackBright(italic(timestamp as string)) : timestamp} [${level}]: ${message}`];

			if (info.error instanceof Error) {
				const stack = stackTrace(info.error.stack!);
				messages.push(color ? whiteBright(italic(stack)) : stack);
			}

			return messages.join('');
		})
	);
}
