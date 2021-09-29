const { Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'set-tickets',
    description: 'Set a ticket channel',
    permission: ['ADMINISTRATOR'],
    ownerOnly: false,
    options: [
        // {
        //     type: 'CHANNEL',
        //     description: 'Select your tickets channel!',
        //     name: 'channel_to_send',
        //     required: true,
        // },
        {
            type: 'STRING',
            description: 'paste link for your custrom image!',
            name: 'custom_image',
            required: false,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, message) => {
        const ticketstart = new MessageEmbed()
            .setTitle("Create a ticket").setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription("Choose the category you need help on our __Select Menu__ so we can assist you! \n**_NOTE:_** You need to select `Reload` option too because of the latest discord update ")
            .setFooter(interaction.guild.name, interaction.guild.iconURL()).setColor(client.config.color)
            .setImage(args.join(' ')).setTimestamp()

        const supprot = new MessageSelectMenu()
            .setCustomId('support')
            .setPlaceholder('Make a Selection')
            .setMinValues(2)
            .setMaxValues(3)
            .addOptions(
                {
                    label: 'Reload',
                    description: 'Select this option before continuing',
                    value: 'reload01',
                    emoji: '869351455558098945'
                },
                {
                    label: 'Support',
                    description: 'This is to directly resulve your issue',
                    value: 'support01',
                    emoji: '877235024263524382'
                },
                {
                    label: 'Contact staff',
                    description: 'This is to directly talk with staff member ',
                    value: 'staff01',
                    emoji: '877913018430783619'
                },
                {
                    label: 'Question',
                    description: 'This is to directly get answer to your question',
                    value: 'question01',
                    emoji: '877920259389149236'
                },
            )

        const row = new MessageActionRow().addComponents(supprot)
        interaction.followUp({ embeds: [ticketstart], components: [row] });
    }
}