module.exports = {
    register: function(bot, functions) {
        bot.registerCommand("mod", (msg) => {
            msg.createMessage("The mod parent command");
        }, {
            usage: "<subCommand>",
            description: "The parent command for all your moderation needs",
            fullDescription: "An organisational parentCommand containing all of the moderation type commands"
        })
    }
}