const express = require('express');

module.exports = (client) => {
  const router = express.Router();

  // GET route to fetch items
  router.get("/", async (req, res) => {
    try {
      console.log('Fetching items from Redis');
      const items = await client.lRange('items', 0, -1);
      // Deserialize JSON strings back to objects
      const todos = items.map(item => JSON.parse(item));
      console.log(`Retrieved ${todos.length} items from Redis`);
      res.json(todos); // Return an array of todo objects
    } catch (error) {
      console.error('Error fetching items from Redis:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // POST route to add a new item
  router.post("/newItem", async (req, res) => {
    try {
      const newItemTitle = req.body.title; // Extract title from request
      if (!newItemTitle) throw new Error('Item title is undefined or empty');

      // Create a new todo object
      const newItem = {
        id: Date.now(), // Simple ID generation (could also use a counter)
        title: newItemTitle,
        completed: false,
      };

      console.log(`Adding new item to Redis: ${JSON.stringify(newItem)}`);
      await client.rPush('items', JSON.stringify(newItem)); // Store the object as a JSON string
      console.log('Item added successfully to Redis');
      res.status(201).json(newItem); // Return the newly created todo object
    } catch (error) {
      console.error('Error adding new item to Redis:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
