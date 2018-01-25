module.exports = {
	register: function(bot) {
		bot.commands.pubg.registerSubcommand("update", "Will be updated when the pubg-tracker API is back for testing", {
			aliases: ["checkup", "check", "up"],
		});
	},
};
