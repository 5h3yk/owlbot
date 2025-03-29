const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkme')
        .setDescription('Retourne des informations à votre sujet. 🕵️'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username} est parmi nous depuis le ${interaction.member.joinedAt}.`);
    },
};