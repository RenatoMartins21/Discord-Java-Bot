const client = require("../index");
const config = require("../config.json");
const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);
client.on("ready", async () => {
  client.user.setActivity(`${config.prefix}help`);
  console.log(`${client.user.username} ✅`);
  console.log(
    "-------------------------------------------------HANDLER BY @ISHANDEV2004-----------------------------------------\nJoin https://discord.gg/fQDgHAh7 for free accounts\nHave a great day!"
  );

  const slashCommands = await globPromise(`${process.cwd()}/scommands/*/*.js`);

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    arrayOfSlashCommands.push(file);
  });

  // Register for a single guild
  //await client.guilds.cache
  //  .get(config.guildId)
  //  .commands.set(arrayOfSlashCommands);

  // Register for all the guilds the bot is in
   await client.application.commands.set(arrayOfSlashCommands);
});
