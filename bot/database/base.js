const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.mongodb;

const client = new MongoClient(uri);
const database = client.db('OnePieceCU');
const episodes = database.collection('episodes');
const users = database.collection('users');
const chapters = database.collection('chapters');

module.exports = {
	database,
	episodes,
	users,
	chapters,
};