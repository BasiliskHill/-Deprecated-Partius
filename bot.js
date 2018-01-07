const Eris = require("eris");
var config = require("./Partius.json")
var shortUrl = require("node-url-shortener");

var bot = new Eris.CommandClient(config.token, {}, config.commandOptions);

bot.on("ready", () => {
    console.log("ONLINE!");
		console.log("Current prefix: " + bot.commandOptions.prefix);
		bot.editStatus("online", {
			name: "/prt help"
		});
});
//Command list
var admin = bot.registerCommand("admin", "A parent command for all admin+ commands.", {
	description: "The parent command for Admin+ commands.",
	fullDescription: "The parent command for all administrator+ commands",
	defaultSubcommandOptions: {
		requirements: {
			permissions: {
			"administrator": true
			}
		}
	}
});

var purge = admin.registerSubcommand("purge", async (msg, args) => {
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
			color: 0xd50000,
			footer: {
				text: footer(msg),
				icon_url: msg.author.avatarURL
			}
		}
	});
	//Console logging
	serverLog(msg, embedLog, "390789909902000129");
}, {
	guildOnly: true,
	description: "Purge a channel",
	fullDescription: "Purges a number of (or all, if no limit is set) messages from the channel the command was sent in.\n" +
	"Will only work on messages < 2 weeks old.",
	usage: "<limit>",
	cooldown: 5000
});

var purgeAll = purge.registerSubcommand("all", async (msg, args) => {
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
				text: footer(msg)
			}
		}
	});
	serverLog(msg, embedLog, "390790193231167488");

}, {
	guildOnly: true,
	description: "Purge a whole server",
	fullDescription: "Purges all messages < 2 weeks old from **all** channels on the server",
	cooldown: 60000,
	requirements: {
    userIDs: message => [message.channel.guild.ownerID]
	}
});

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
	//Responds with random versions of "Ping!" when someone says "/prt pong"
	description: "Pong!",
	fullDescription: "A command to check if the bot is up, or for entertainment... Weirdos."
})
//Functions used

function footer(msg) {
	return "Requested by " + msg.author.username;
}

function serverLog(msg, embedLog, LogChannelID) {
	bot.createMessage(LogChannelID, {
		content: msg.command.parentCommand.label + " " +
		msg.command.label + " completed in: " + msg.channel.guild.name,
		embed: embedLog.embeds[0]
	});
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
