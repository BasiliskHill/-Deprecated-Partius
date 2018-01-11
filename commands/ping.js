module.exports = {
	register: function(bot) {
		bot.registerCommand('ping', ['Pang!', 'Peng!', 'Pong!', 'Pung!'], {
			// Responds with random versions of "Ping!" when someone says "/pt pong"
			description: 'Pong!',
			fullDescription: 'A command to check if the bot is up, or for entertainment... Weirdos.',
		});
	},
};
