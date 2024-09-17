const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const port = 3001;

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});

// Handle connection events
redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Redis connection error:', err);
  process.exit(1);  // Exit if Redis fails to connect
});

redisClient.on('error', (err) => {
  console.error('Redis encountered an error:', err);
});

// Middleware
app.use(cors({ origin: '*' })); // Allow requests from your frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const itemRoutes = require('./routes/items')(redisClient); // Pass the Redis client to the routes
app.use('/api/items', itemRoutes);

// Shutdown
process.on('SIGINT', () => {
  redisClient.quit(() => {
    console.log('Redis client disconnected');
    process.exit(0);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
