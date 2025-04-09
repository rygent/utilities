import { createLogger, type LeveledLogMethod, Logger, transports } from 'winston';
import { Discord } from './lib/discord-transport.js';
import { levels } from './lib/constants.js';
import { formatter } from './lib/utils.js';
import moment from 'moment';
import 'moment-timezone';
import 'winston-daily-rotate-file';

const timezone = process.env.TZ || process.env.TIMEZONE || 'UTC';
moment.tz.setDefault(timezone);

export const logger = createLogger({
	level: process.env.DEBUG === 'true' ? 'debug' : 'info',
	levels: levels,
	transports: [
		new transports.Console({ format: formatter(true) }),
		new transports.DailyRotateFile({
			level: 'error',
			format: formatter(false),
			datePattern: 'yyyyMMDD',
			dirname: `${process.cwd()}/logs`,
			filename: 'report.%DATE%.log',
			maxFiles: '14d'
		}),
		new Discord({ level: 'error', unique: true })
	]
}) as Logger & Record<keyof typeof levels, LeveledLogMethod>;
