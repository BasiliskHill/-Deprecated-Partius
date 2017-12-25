const Eris = require("eris");
var config = require("dev.json");
console.log(config.commandOptions);
console.log(require("dev.json").commandOptions);

var bot = new Eris.CommandClient(config.token, {}, config.commandOptions);

bot.on("ready", () => {
  console.log("Ready!");
});

bot.registerCommand("ping", "pong", {});

bot.connect();
