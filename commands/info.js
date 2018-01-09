var shortUrl = require("node-url-shortener");

module.exports = {
	register: function (bot, functions) {
		var info = bot.registerCommand("info", (msg, args) => {
			if (msg.mentions.length === 0) { //If no one is mentioned, send the author's info
				return userInfo(msg, msg.author, functions);
			}
			userInfo(msg, msg.mentions[0], functions);
		}, {
			aliases: ["information", "in", "mi"],
			usage: "<@user>",
			guildOnly: true,
			description: "WIP User information sender.",
			fullDescription: "WIP command. Will be used to send general information on the user aswell as leaderboard statuses and game stats."
		});
	}
}

async function userInfo(msg, user, functions) {
	var nickname = msg.channel.guild.members.get(user.id).nick;
	var date = new Date();
	shortUrl.short(user.dynamicAvatarURL("png", 1024), function(err, url){
		msg.channel.createMessage({
			embed: {
				description: `**This embed displays all information I have on ${user.username}**`,
				timestamp: date.toISOString(),
				color: 0xd50000,
				footer: {
					text: functions.footer(msg),
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
