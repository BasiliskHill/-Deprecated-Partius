const Eris = require("eris");
var config = require("dev.json");

var bot = new Eris.CommandClient(config.token, {}, config.commandOptions);

bot.on("ready", () => {
  console.log("Ready!");
});

bot.registerCommand("ping", "pong", {});

bot.connect();
