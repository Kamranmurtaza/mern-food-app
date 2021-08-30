require('dotenv').config();
require('express-async-errors');
const express = require('express');
const winston = require('winston');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurant');
const mealRoutes = require('./routes/meal');
const cartRoutes = require('./routes/cart');
const { error } = require('./middlewares/error');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

require('./database/connection');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/restaurants/:restaurantId/meals', mealRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/cart', cartRoutes);

app.use(error);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
