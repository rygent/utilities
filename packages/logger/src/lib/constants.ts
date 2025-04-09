import { blueBright, gray, greenBright, red, redBright, yellowBright } from 'colorette';

export const levels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	trace: 5
};

export const levelColors = {
	fatal: red,
	error: redBright,
	warn: yellowBright,
	info: greenBright,
	debug: blueBright,
	trace: gray
};
