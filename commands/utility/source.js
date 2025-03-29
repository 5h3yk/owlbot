const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('source')
        .setDescription('🔗 Lien vers le code source du bot.'),
    async execute(interaction) {
        await interaction.reply('Mon code source est disponible par ici: 🔗 https://github.com/5h3yk/owlbot');
    },
};