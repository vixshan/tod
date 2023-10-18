const { MongoClient } = require('mongodb');

class TruthDatabase {
  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  async addTruthQuestion(question) {
    try {
      const database = this.client.db('truth_or_dare');
      const collection = database.collection('truth_questions');
      await collection.insertOne({ question });
      console.log('Added truth question:', question);
    } catch (err) {
      console.error('Error adding truth question:', err);
    }
  }

  async getTruthQuestion() {
    try {
      const database = this.client.db('truth_or_dare');
      const collection = database.collection('truth_questions');
      const questions = await collection.find().toArray();
      return questions[Math.floor(Math.random() * questions.length)];
    } catch (err) {
      console.error('Error fetching truth question:', err);
      return null;
    }
  }
}

module.exports = TruthDatabase;
