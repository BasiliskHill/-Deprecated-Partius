const Eris = require("eris");
const fs = require("fs");
const config = require("./Partius.json");
const exec = require("child_process").exec;


const bot = new Eris.CommandClient(config.token, {}, config.commandOptions);

bot.on("ready", () => {
	console.log("\nREADY!");
	console.log("Current prefix: " + bot.commandOptions.prefix);
	bot.editStatus("online", {
		name: `${bot.commandOptions.prefix}help`,
	});
});

// Command list
fs.readdir("./commands", (err, files) => {
	if (err != null) {
		console.log(err.stack);
	}
	else {
		for (const file in files) {
			const curFile = files[file];
			const command = require(`./commands/${curFile}`);

			command.register(bot, functions);
			console.log(`Command '${curFile.slice(0, -3)}' has been loaded.`);
		}
	}
});

//	Event Listeners
bot.on("messageCreate", msg => {
	if (msg.channel.id == "409245084903800832") {
		execute("sh ./pull.sh");
	}
});
bot.on("disconnect", () => {
	console.log("\nDisconnected.\n");
});

bot.on("error", err => {
	console.log(err.stack);
	functions.serverLog.error(err.stack);
});

const execute = function(command) {
	exec(command, (error, stdout, stderr) => {
		console.log(`${stdout}`);
		console.log(`${stderr}`);
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
};

// Global Functions used
const functions = {
	serverLog: {
		noNotify: function(msg, embedLog) {
			bot.createMessage("390789909902000129", {
				content: `Completed in: ${msg.channel.guild.name}`,
				embed: embedLog.embeds[0],
			});
		},
		notify: function(msg, embedLog) {
			bot.createMessage("390790193231167488", {
				content: `Completed in: ${msg.channel.guild.name}`,
				embed: embedLog.embeds[0],
			});
		},
		error: function(err) {
			bot.createMessage("390790193231167488", err);
		},
	},
	footer: function(msg) {
		return `Requested by ${msg.author.username}`;
	},
};

bot.connect();
