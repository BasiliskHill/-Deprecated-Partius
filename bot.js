const Eris = require("eris");
var config = require("./Partius.json");
var fs = require("fs");

var bot = new Eris.CommandClient(config.token, {}, config.commandOptions);

bot.on("ready", () => {
    console.log("\nREADY!");
		console.log("Current prefix: " + bot.commandOptions.prefix);
		bot.editStatus("online", {
			name: `${bot.commandOptions.prefix}help`
		});
});
//Command list
fs.readdir("./commands", (err,files) => {
	if (err != null) {
		console.log(err.stack);
	} else {
		for (var file in files) {
			var command = require(`./commands/${files[file]}`);
			command.register(bot, functions);

			console.log(`Command '${files[file].slice(0, -3)}' has been loaded.`);
		}
	}
});

//Functions used
var functions = {
	serverLog: {
		noNotify: function (msg, embedLog, bot) {
			bot.createMessage("390789909902000129", {
				content: `Completed in: ${msg.channel.guild.name}`,
				embed: embedLog.embeds[0]
			});
		},
		notify: function (msg, embedLog, bot) {
			bot.createMessage("390790193231167488", {
				content: `Completed in: ${msg.channel.guild.name}`,
				embed: embedLog.embeds[0]
			});
		}
	},
	footer: function(msg) {
		return `Requested by ${msg.author.username}`;
	}
}

bot.connect();
