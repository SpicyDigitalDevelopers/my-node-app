require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware om JSON te verwerken
app.use(express.json());

// MongoDB connectie
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected ✅');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Mongoose model
const User = mongoose.model('User', {
  name: String,
  email: String
});

// Test route voor de homepagina
app.get('/', (req, res) => {
  res.send('API is live 🚀');
});

// API-routes
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: 'Error saving user', details: err });
  }
});

// Start de server
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
