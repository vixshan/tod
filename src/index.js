// Import the required modules.
const { MongoClient } = require('mongodb');
const { Client } = require('discord.js');

// Create a MongoClient instance and connect to the online MongoDB database.
const mongoClient = new MongoClient('mongodb://localhost:27017');
mongoClient.connect((err, db) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Create a Discord bot instance.
  const bot = new Client();

  // Load the Discord bot slash commands.
  const commands = require('./src/discord/commands');
  bot.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find(cmd => cmd.name === interaction.commandName);
    if (!command) return;

    try {
      await command.handler(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `Something went wrong while executing the command.`,
        ephemeral: true,
      });
    }
  });

  // Start the Discord bot.
  bot.login('YOUR_DISCORD_BOT_TOKEN');

  // Expose the Discord bot and database connection to the rest of the application.
  global.bot = bot;
  global.db = db;
});
