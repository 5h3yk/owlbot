const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Retourne des informations sur le serveur. 🌐'),
	async execute(interaction) {
		await interaction.reply(`${interaction.guild.name} compte ${interaction.guild.memberCount} gens chouettes !`);
	},
};