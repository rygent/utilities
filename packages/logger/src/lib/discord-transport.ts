import TransportStream from 'winston-transport';
import { EmbedBuilder } from '@discordjs/builders';
import { bold, codeBlock, italic, time } from '@discordjs/formatters';
import { isColorSupported } from 'colorette';
import { fetch, type RequestInfo, type RequestInit } from 'undici';
import { inspect } from 'node:util';

interface DiscordTransportOptions {
	level?: string;
	unique?: boolean;
}

interface LogEntry {
	level: string;
	error?: Error;
	webhook?: {
		url?: string;
		avatar_url?: string;
		username?: string;
		title?: string;
	};
}

export class Discord extends TransportStream {
	private readonly unique?: boolean;

	public constructor(options: DiscordTransportOptions) {
		super(options);

		this.level = options.level ?? 'error';
		this.unique = options.unique ?? false;
	}

	public override log(info: LogEntry, next: () => void) {
		if (this.unique && this.level !== info.level) return next();
		if (typeof info.error === 'undefined') return next();
		if (typeof info.webhook === 'undefined') return next();
		if (!info.webhook.url) return next();

		setImmediate(() => {
			this.emit('logged', info);

			void this.send(info);
		});

		next();
	}

	private async send(info: LogEntry) {
		if (typeof info.error === 'undefined') return;
		if (typeof info.webhook === 'undefined') return;
		if (!info.webhook.url) return;

		const embed = new EmbedBuilder()
			.setColor(0xe13f4d)
			.setTitle(info.webhook.title ?? info.error.name)
			.setDescription(
				[
					`${codeBlock('xl', this.clean(info.error.stack))}`,
					`${bold(italic('Message:'))} ${info.error.message}`,
					`${bold(italic('Date:'))} ${time(new Date(Date.now()), 'D')} (${time(new Date(Date.now()), 'R')})`
				].join('\n')
			);

		if (info.webhook.username && info.webhook.avatar_url) {
			embed.setFooter({ text: `Powered by ${info.webhook.username}`, iconURL: info.webhook.avatar_url });
		}

		try {
			await this.fetcher(info.webhook.url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...(info.webhook.username && { username: info.webhook.username }),
					...(info.webhook.avatar_url && { avatar_url: info.webhook.avatar_url }),
					embeds: [embed.toJSON()]
				})
			});
		} catch (error) {
			this.emit('error', error);
		}
	}

	private async fetcher<JSON = unknown>(info: RequestInfo, init?: RequestInit): Promise<JSON> {
		const res = await fetch(info, init);

		if (!res.ok) {
			const message = `Received status ${res.status} (${res.statusText})`;
			const error = new Error(message);

			throw error;
		}

		return res.json() as Promise<JSON>;
	}

	private clean(input: any, depth?: number) {
		if (typeof input === 'string') return input;
		const cleaned = inspect(input, { colors: isColorSupported, depth: depth ?? 2 });
		return cleaned;
	}
}
