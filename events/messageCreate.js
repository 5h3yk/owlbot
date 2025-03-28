const { Events, Message } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

/**
 * Les réactions sont stockées dans un petit JSON en .gitignore pour rester secrètes 🤫
 */
const reactionsPath = path.join(__dirname, '../data/reactions.json');
let reactionsMap;
try {
    reactionsMap = JSON.parse(fs.readFileSync(reactionsPath, 'utf-8'));
} catch (error) {
    console.error('Erreur lors du chargement de reactions.json :', error);
    process.exit(1);
}

function reactToMessage(message) {
    for (const { triggers, reaction } of reactionsMap) {
        if (triggers.some(trigger => message.content.toLowerCase().includes(trigger))) {
            message.react(reaction).catch(console.error);
        }
    }
}

/**
 * Oui, vraiment :)
 */
function feurIt(message) {
    const content = message.content.trim().toLowerCase();
    if (content.endsWith('quoi')) {
        const random = Math.floor(Math.random() * 100) + 1;
        const response = random === 1 ? '**COUBEH**' : '**FEUR**';
        message.reply(response).catch(console.error);
    }
}

module.exports = {
    name: Events.MessageCreate,
    /**
     * @param {Message} message 
     */
    async execute(message) {
        reactToMessage(message);
        feurIt(message);
    },
};