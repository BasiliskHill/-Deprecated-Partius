module.exports = {
	register: function (bot, functions) {
		var purgeAll = bot.commands.purge.registerSubcommand("all", async (msg, args) => {
			var messagesKilled = 0;

			for (channel of msg.channel.guild.channels.values()) {
				if (channel.type === 0) {
					messagesKilled += await bot.purgeChannel(channel.id, -1);
				}
			}

			//Discord logging
			var embedLog = await msg.channel.createMessage({
				embed: {
					title: "Purge ALL completed.",
					description:"Deleted a total of " + (messagesKilled - 1) + " message(s) from the server.",
					color: 0xd50000,
					footer: {
						icon_url: msg.author.avatarURL,
						text: functions.footer(msg)
					}
				}
			});
			functions.serverLog.notify(msg, embedLog, bot);

		}, {
			guildOnly: true,
			description: "Purge a whole server",
			fullDescription: "Purges all messages < 2 weeks old from **all** channels on the server",
			cooldown: 60000,
			requirements: {
		    userIDs: message => [message.channel.guild.ownerID]
			}
		});
	}
}
