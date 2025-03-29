# 🦉 owlbot
*Un chouette bot, codé avec des parties du corps que l'on ne citera pas.*

Plus sérieusement, owlbot c'est un bot à tout faire que je conçois pour mon usage personnel.

Le code est libre, n'hésitez pas à le parcourir et, pourquoi pas, à me faire des retours. Et si vous avez des idées de fonctionnalités aditionnelles à y intégrer, je suis toute ouïe !

Dans l'idée, il expose des commandes (/) et écoute les messages d'un serveur pour y ajouter des réactions.

## Variables requises
Si pour une raison x ou y vous récupérez ce code, pour l'exécuter, il vous faudra configurer quelques petites variables. En détail :

### .env
Explicite, le projet repose sur un certain nombre de variables d'environnement:
- `DISCORD_BOT_TOKEN` Le token de votre Bot, obtenu via le developer portal de Discord
- `DISCORD_BOT_APPLICATION_ID` L'application id également obtenu via le developer portal de Discord
- `DISCORD_GUILD_ID` L'id du serveur où vous souhaitez déployer  ce bot
- `NASA_API_KEY` La clé API récupérée sur [le portail de la NASA](https://api.nasa.gov/). **Requis pour la commande `/apod`**

### data/reactions.json
**Ce fichier est requis pour les réactions automatiques** dans l'event `messageCreate.js`.

Format des données :
```
[
    {
        "triggers": [
            "tableau", "de chaînes de", "caractères"
        ],
        "reaction": "👍" // Un emoji unicode ou un blob discord 
    },
]
```