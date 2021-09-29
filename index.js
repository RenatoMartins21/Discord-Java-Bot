const { Collection, Client, Discord, MessageEmbed } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: 32767,
});
module.exports = client;
const config = require("./config.json");
const token = config.token;
client.login(token);
const { mongoString } = require("./config.json");
const mongoose = require("mongoose");
mongoose
  .connect(mongoString, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongodb.");
  });
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

