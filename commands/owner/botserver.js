const { Client, Message, MessageEmbed } = require("discord.js");
const color = require("../../config.json").color;
const owner = require("../../config.json").owner;
// const ERROR_LOGS_CHANNEL = require("../../config.json").ERROR_LOGS_CHANNEL;

module.exports = {
  name: "botservers",
  description: `show each server bot is in!`,
  aliases: ["bs"],
  emoji: "š®",
  timeout: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (message.author.id != owner) {
        return message.channel.send("Limited to the bot owner only!");
      }
      let data = [];
      client.guilds.cache.forEach((x) => {
        message.channel.send(
          `š¹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`
        );
      });

      if (data.length > 0) {
        data.sort();
        data = `š¹ ` + data.join("\nš¹");
      } else {
        data = "[No server found]";
      }
    } catch (err) {
      console.log(err);
    }
  },
};
