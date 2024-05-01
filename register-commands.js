require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'quote',
        description: 'Replies with a Random Inspirational Quotes!',
    },
    {
        name: 'service',
        description: 'Replies with a UWaterloo Counselling Services Info',
    },
];

const rest = new REST({version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering Slash Commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands }
        )

        console.log('Slash Commands were registered...')
    } catch(error) {
        console.log(`There was an error: ${error}`);
    }
})();