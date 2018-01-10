module.exports = {
	register: function (bot, functions) {
		var purge = bot.registerCommand("purge", async (msg, args) => {
			var date = new Date();
			var channelID = msg.channel.id;
			var limit = parseInt(args);
			var messagesKilled = 0;

			if (args.length === 0) { //If there aren't any args passsed
				messagesKilled = await bot.purgeChannel(channelID, -1); //Wipe the whole channel
			} else if (isNaN(limit)) { //If there is an arg passed but it isn't an int
				return "The limit isn't actually a limit I can use."; //Say it can't use the limit
			} else { //If there is nothing wrong with the limit sent
		 		messagesKilled = await bot.purgeChannel(channelID, limit + 1);
			}

			//Discord logging
			var embedLog = await msg.channel.createMessage({
				embed: {
					title: "Purge completed.",
					description:"Deleted " + (messagesKilled - 1) + " message(s) from this channel.",
					timestamp: date.toISOString(),
					color: 0xd50000,
					footer: {
						text: functions.footer(msg),
						icon_url: msg.author.avatarURL
					}
				}
			});
			functions.serverLog.noNotify(msg, embedLog, bot);

		}, {
			guildOnly: true,
			description: "Purge a channel",
			fullDescription: "Purges a number of (or all, if no limit is set) messages from the channel the command was sent in.\n" +
			"Will only work on messages < 2 weeks old.",
			usage: "<limit>",
			cooldown: 5000
		});
	},
}
