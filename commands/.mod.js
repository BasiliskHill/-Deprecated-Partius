module.exports = {
    register: function(bot, functions) {
        bot.registerCommand("mod", (msg) => {
            const date = new Date();
            const commandList = []
            
            for (command in bot.commands.mod.subcommands) {
                commandList.push(command);
            }

            msg.channel.createMessage({
                embed: {
                    title: "Partius moderation commands",
                    description: `Command list: \n${msg.prefix}mod ${commandList.join(`\n${msg.prefix}mod `)}`,
                    timestamp: date.toISOString(),
				    color: 0xd50000,
				    footer: {
					    text: functions.footer(msg),
					    icon_url: msg.author.avatarURL,
				    },
                }
            });

        }, {
            usage: "<subCommand>",
            description: "The parent command for all your moderation needs",
            fullDescription: "An organisational parentCommand containing all of the moderation type commands"
        })
    }
}