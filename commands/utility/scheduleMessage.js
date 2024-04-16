const { SlashCommandBuilder } = require("discord.js");
require('dotenv').config();
const schedule = require('node-schedule');
const cs161 = process.env.CS161_ANNOUNCEMENTS;
const ics45j = process.env.ICS45J_ANNOUNCEMENTS;
// const cs161 = '1106385921986789426';
// const ics45j = '1169744325928833057';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('schedule-message')
    .setDescription('schedule message')
    .addStringOption(option => option.setName('message').setDescription('message to be sent').setRequired(true))
    .addStringOption(option => option.setName("datestring").setDescription('date').setRequired(true))
    .addStringOption(option => option.setName("time").setDescription("time").setRequired(true)),


    async execute(interaction) {
        const message = interaction.options.getString("message");
        const datestring = interaction.options.getString("datestring");
        const time = interaction.options.getString("time");
        const channel = interaction.channelId == process.env.CS161_ANNOUNCEMENTS ? interaction.client.channels.cache.get(cs161) : interaction.channelId == process.env.ICS45J_ANNOUNCEMENTS ? interaction.client.channels.cache.get(ics45j) : null;
        const ping_role = interaction.channelId == process.env.CS161_ANNOUNCEMENTS ? process.env.CS161_ROLE : interaction.channelId == process.env.ICS45J_ANNOUNCEMENTS ? process.env.ICS45J_ROLE : null;
        const datetime = new Date(`${datestring}T${time}:00`);
        // console.log(datetime, channel, ping_role);
        if (`${datetime}` != "Invalid Date") {
            // console.log("valid reply");
            // console.log(`${datetime}`);
            schedule.scheduleJob(datetime, ((chan, msg, role) => {chan.send(`<@&${role}> ${msg}`);}).bind(null, channel, message, ping_role));
            await interaction.reply({ephemeral: true, content: `Scheduled ${message} for ${datetime}`});
        } else {
            await interaction.reply({ephemeral: true, content: `Message not scheduled, Invalid Date`});
        }
    }
}
