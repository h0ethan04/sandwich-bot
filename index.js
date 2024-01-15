const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const cs161channels = process.env.CS161.split(' ');
const ics45jchannels = process.env.ICS45J.split(' ');
const verifiedUsers = process.env.VERIFIED_USERS.split(' ');


client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (verifiedUsers.includes(message.author.id)) { console.log('here'); return;}
  // let attachments_channel;
  // if (ics45jchannels.includes(message.channel.id)) {
  //   attachments_channel = '1195599598362832926';
  // }  else if (cs161channels.includes(message.channel.id)) {
  //   attachments_channel = '1195479401056440320';
  // }  else {
  //   attachments_channel = '1195479401056440320';
  // }
  const attachments_channel = ics45jchannels.includes(message.channel.id) ? '1195599598362832926' : '1195479401056440320';

  if (message.attachments.size) {
    const attachments = Array.from(message.attachments.values());
      attachments.forEach(async attachment => {

        const embed = new EmbedBuilder().setTitle('File Attachment!').setColor(0x0099FF).setTimestamp().setImage(attachment.url).addFields(
          {name: 'display name', value: message.author.displayName},
          {name: 'uid', value: message.author.id},
          {name: 'message url', value: message.url}
        );

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel('Ban').setStyle(ButtonStyle.Primary).setCustomId('ban'),
          new ButtonBuilder().setLabel('Cancel').setStyle(ButtonStyle.Danger).setCustomId('cancel')
        );

        (await client.channels.fetch(attachments_channel)).send({embeds: [embed], components: [row]});
      });
  }
  if (message.embeds.length) {
    message.embeds.forEach(async embedAttachment => {
      const embed = new EmbedBuilder().setTitle('Embed Attachment!').setColor(0x0099FF).setTimestamp().addFields(
        {name: 'display name', value: message.author.displayName},
        {name: 'uid', value: message.author.id},
        {name: 'message url', value: message.url},
        {name: 'embed url', value: embedAttachment.url}
      ).setImage(embedAttachment.data.thumbnail != null ? embedAttachment.data.thumbnail.url : embedAttachment.data.image.url);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel('Ban').setStyle(ButtonStyle.Primary).setCustomId('ban'),
        new ButtonBuilder().setLabel('Cancel').setStyle(ButtonStyle.Danger).setCustomId('cancel')
      );

      (await client.channels.fetch(attachments_channel)).send({embeds: [embed], components: [row]});
    });
  }
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'ban') {
    const msg = interaction.message;
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('Confirm Ban').setStyle(ButtonStyle.Primary).setCustomId('confirm ban'),
      new ButtonBuilder().setLabel('Cancel').setStyle(ButtonStyle.Danger).setCustomId('cancel')
    );
    interaction.update({embeds: [msg.embeds[0]], components: [row]});
  }
  else if (interaction.customId === 'confirm ban') {
    // get the uid that you stashed in the message :)
    const msg = interaction.message; const uid = msg.embeds[0].fields[1].value;
    interaction.update({embed: [msg.embeds[0]], components: []});
    msg.guild.bans.create(uid, {'deleteMessageSeconds':604800, 'reason': 'images sent broke rules'});
  }
  else if (interaction.customId === 'cancel') {
    interaction.update({embed: [interaction.message.embeds[0]], components: []});
  }

});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
