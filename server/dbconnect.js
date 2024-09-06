const redis = require('redis');

const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));

async function connectToRedis() {
    await client.connect();
}

module.exports = { client, connectToRedis };