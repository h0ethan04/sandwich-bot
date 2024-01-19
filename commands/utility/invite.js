const { SlashCommandBuilder, Invite } = require("discord.js");
require('dotenv').config();
const cs161channels = process.env.CS161.split(' ');
const ics45jchannels = process.env.ICS45J.split(' ');



module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("generate single use invite"),

    async execute(interaction) {
      const user_channel = interaction.channelId;
      const channel = cs161channels.includes(user_channel) ? process.env.CS161_INVITE : ics45jchannels.includes(user_channel) ? process.env.ICS45J_INVITE : null;
      const invite = await interaction.guild.invites.create(channel, { maxAge: 86400, maxUses: 1});
      await interaction.reply({ephemeral: true, content: `Here is your single use invite link: ${invite.url}`});
    }
}
