// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/eventManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Event = mongoose.model('Event', EventSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));

// Routes
app.post('/addNewItem', (req, res) => {
  // Handle Add New Item form submission
  const { name, description } = req.body;

  // Create a new event
  const newEvent = new Event({
    name,
    description,
  });

  // Save the event to the database
  newEvent.save((err, event) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).json(event);
  });
});


// Add New Item
app.post('/addNewItem', (req, res) => {
  const { name, description } = req.body;

  const newEvent = new Event({
    name,
    description,
  });

  newEvent.save((err, event) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).json(event);
  });
});

// Product Status
app.get('/productStatus/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  // Fetch the event from the database based on eventId
  Event.findById(eventId, (err, event) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Customize the response based on Product Status logic
    res.json({ status: 'Active', event });
  });
});

// Request Item
app.post('/requestItem', (req, res) => {
  const { itemName, userId } = req.body;

  res.status(200).send('Item requested successfully');
});

// View Product
app.get('/viewProduct/:productId', (req, res) => {
  const productId = req.params.productId;

  // Fetch the product from the database based on productId
  

  res.status(200).json({ productId, productName: 'Example Product' });
});

// Request Item
app.post('/requestItem', (req, res) => {
  const { itemName, userId } = req.body;

  
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    
    // Update the user's cart with the requested item
    user.cart.push({ itemName });

    // Save the updated user to the database
    user.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      // Create an order for the requested item
      const order = new Order({
        userId: user._id,
        itemName,
        status: 'Pending', // Set the initial status of the order
      });

      // Save the order to the database
      order.save((err, savedOrder) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        res.status(200).json({
          message: 'Item requested successfully',
          user: user,
          order: savedOrder,
        });
      });
    });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
