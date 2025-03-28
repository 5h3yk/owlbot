const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = {
    cooldown: 3600,
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('Récupère une jolie image astronomique du jour. 🛰️'),
    async execute(interaction) {
        const apiKey = process.env.NASA_API_KEY;
        if (!apiKey) {
            return interaction.reply("Hou-hou, j'ai un petit souci avec l'API de la NASA. 😅");
        }

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

        try {
            await interaction.deferReply();

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Echec de requête ${response.status}`);
            }

            const data = await response.json();

            const imageResponse = await fetch(data.url);
            if (!imageResponse.ok) {
                throw new Error(`Impossible de télécharger l'image: ${imageResponse.status}`);
            }

            const arrayBuffer = await imageResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            /**
             * Apparemment, les embeds Discord ne tolèrent que le format PNG...
             * Il faut donc les télécharger et les convertir avant de les retourner.
             */
            const outputPath = path.join(__dirname, 'temp.png');
            await sharp(buffer).png().toFile(outputPath);

            const attachment = new AttachmentBuilder(outputPath, { name: 'apodImage.png' });

            const embed = new EmbedBuilder()
                .setColor(parseInt('00ff40', 16))
                .setTitle(data.title)
                .setImage('attachment://apodImage.png')
                .setURL(data.hdurl || data.url)
                .setDescription(data.explanation)
                .setFooter({ text: data.copyright ? `© ${data.copyright}` : 'Domaine public' })
                .setTimestamp(new Date(data.date));

            await interaction.editReply({ embeds: [embed], files: [attachment] });

            fs.unlinkSync(outputPath);
        } catch (error) {
            console.error('Erreur de récupération des données APOD:', error);
            await interaction.editReply("Houston, nous avons un problème avec l'API de la NASA... 😅 Retente un peu plus tard !");
        }
    },
};