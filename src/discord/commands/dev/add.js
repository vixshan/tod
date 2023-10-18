// src/discord/commands/add-question.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'add-question',
  description: 'Adds a question to the database.',
  slashCommandBuilder: new SlashCommandBuilder()
    .setName('add-question')
    .setDescription('Adds a question to the database.')
    .addStringOption(option =>
      option.setName('question-type')
        .setDescription('The type of question (truth, dare, paranoia, nhie)')
        .setRequired(true)
        .addChoices(
          { name: 'Truth', value: 'truth' },
          { name: 'Dare', value: 'dare' },
          { name: 'Paranoia', value: 'paranoia' },
          { name: 'Never Have I Ever', value: 'nhie' },
        ),
    )
    .addStringOption(option => option.setName('question').setDescription('The question').setRequired(true)),
  async handler(interaction) {
    const questionType = interaction.options.getString('question-type');
    const question = interaction.options.getString('question');

    // Validate the question type.
    const validQuestionTypes = ['truth', 'dare', 'paranoia', 'nhie'];
    if (!validQuestionTypes.includes(questionType)) {
      return interaction.reply({ content: 'Invalid question type.', ephemeral: true });
    }

    // Insert the question into the database.
    const db = global.db;
    const collection = db.collection(questionType + 's');
    await collection.insertOne({ question });

    // Send a confirmation message to the user.
    await interaction.reply({ content: 'Your question has been added to the database.' });
  },
};
