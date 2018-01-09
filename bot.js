const Eris = require("eris");
var config = require("./Partius.json")
var shortUrl = require("node-url-shortener");
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
/*var purge = purgeJS.register(bot, functions);

var purgeAll =*/

var info = bot.registerCommand("info", (msg, args) => {
	if (msg.mentions.length === 0) { //If no one is mentioned, send the author's info
		return userInfo(msg, msg.author);
	}
	userInfo(msg, msg.mentions[0]);
}, {
	aliases: ["information", "in", "mi"],
	usage: "<@user>",
	guildOnly: true,
	description: "WIP User information sender.",
	fullDescription: "WIP command. Will be used to send general information on the user aswell as leaderboard statuses and game stats."
})

var ping = bot.registerCommand("ping", ["Pang!", "Peng!", "Pong!", "Pung!"], {
	//Responds with random versions of "Ping!" when someone says "/pt pong"
	description: "Pong!",
	fullDescription: "A command to check if the bot is up, or for entertainment... Weirdos."
})

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

async function userInfo(msg, user) {
	var nickname = msg.channel.guild.members.get(user.id).nick;
	var date = new Date();
	shortUrl.short(user.dynamicAvatarURL("png", 1024), function(err, url){
		msg.channel.createMessage({
			embed: {
				description: `**This embed displays all information I have on ${user.username}**`,
				timestamp: date.toISOString(),
				color: 0xd50000,
				footer: {
					text: footer(msg),
					icon_url: msg.author.avatarURL
				},
				thumbnail: {
					url: user.avatarURL
				},
				author: {
					name: ((nickname == null)? user.username : nickname) + "'s Information",
					icon_url: user.avatarURL
				},
				fields: [
					{
						name: "__**General Information:**__",
						value: "<-=->(+)<-=->"
					},
					{
						name: "Username:",
						value: user.username,
						inline: true
					},
					{
						name: "Avatar:",
						value: url,
						inline: true
					},
					{
						name: "__**PUBG Information:**__",
						value: "Additional fields coming soon along with the PUBG commands."
					}
				]
			}
		});
	});


}

bot.connect();
