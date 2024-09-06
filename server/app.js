const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// db config
const { connectToRedis } = require('./dbconnect');

connectToRedis();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const authRoutes = require('./routes/auth.js');
app.use('/auth', authRoutes);

const itemRoutes = require('./routes/items.js')
app.use('/items', itemRoutes);


// start server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});