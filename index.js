require('dotenv/config');
const { Client, EmbedBuilder } = require('discord.js');


const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online`);
});

async function fetchQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        return { quote: data[0].q, author: data[0].a };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'quote') {
        const quoteData = await fetchQuote();
        if (quoteData) {
            interaction.reply(`"${quoteData.quote}" - ${quoteData.author}`);
        } else {
            interaction.reply('Sorry, I was unable to fetch a quote at this time.');
        }
    } else if (interaction.commandName === 'service') {
        const embed = new EmbedBuilder()
        .setTitle('UW Campus Wellness')
        .setURL('https://uwaterloo.ca/campus-wellness/')
        .setColor('Random')
        .addFields({ 
            name: 'Campus Wellness', 
            value: '519-888-4096. ',
            inline: true},
            { 
            name: 'Special Constable Service', 
            value: 'Direct Line: 519-888-4911 \n On Campus Extension: 519-888-4567 ext. 22222',
            inline: true},
            {
            name: 'After-hours contacts - Region of Waterloo',
            value: 'Non-emergency Waterloo Regional Police Services: 519-653-7700 \n Grand River Hospital: 519-749-4300 \n St. Mary\'s Hospital: 519-744-3311 \n Kitchener-Waterloo Sexual Assault Support Centre: 519-741-8633 \n  24/7 hotline: 1-844-437-3247',
            inline: false},
            {
            name: 'After-hours contacts - Ontario',
            value: 'Huron Perth Helpline (Stratford): 1-888-829-7484 \n Stratford General Hospital: 519-272-8210 \n Cambridge Memorial Hospital: 519-621-2330 \n Good2Talk(anonymous): 1-866-925-5454',
            inline: false},
            {
            name: 'After-hours contacts - Canada',
            value: 'Talk Suicide Canada: 1-833-456-4566 or by text 45645 \n  Suicide Crisis Helpline: Call or text 9-8-8',
            inline: false}
        );

        interaction.reply({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);