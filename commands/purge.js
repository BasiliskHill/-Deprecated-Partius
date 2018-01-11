module.exports = {
	register: function(bot, functions) {
		bot.registerCommand('purge', async (msg, args) => {
			const channelID = msg.channel.id;
			const limit = parseInt(args);
			let messagesKilled = 0;

			// If there aren't any args passsed
			if (args.length === 0) {
				// Wipe the whole channel
				messagesKilled = await bot.purgeChannel(channelID, -1);
			}
			// If there is an arg passed but it isn't an int
			else if (isNaN(limit)) {
				// Say it can't use the limit
				return 'The limit isn\'t actually a limit I can use.';
			}
			// If there is nothing wrong with the limit sent
			else {
				messagesKilled = await bot.purgeChannel(channelID, limit + 1);
			}

			// Discord logging
			const embedLog = await msg.channel.createMessage({
				embed: {
					title: 'Purge completed.',
					description:'Deleted ' + (messagesKilled - 1) + ' message(s) from this channel.',
					timestamp: functions.timestamp(),
					color: 0xd50000,
					footer: {
						text: functions.footer(msg),
						icon_url: msg.author.avatarURL,
					},
				},
			});
			functions.serverLog.noNotify(msg, embedLog, bot);

		}, {
			guildOnly: true,
			description: 'Purge a channel',
			fullDescription: 'Purges a number of (or all, if no limit is set) messages from the channel the command was sent in.\n' +
			'Will only work on messages < 2 weeks old.',
			usage: '<limit>',
			cooldown: 5000,
		});
	},
};
