const express = require("express");
const app = express();
const userModel = require('./models/user');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.get('/read', async (req, res) => {
  try {
    let users = await userModel.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { name, email, phone, website } = req.body;
    await userModel.findOneAndUpdate(
      { _id: req.params.id },
      { name, email, phone, website },
      { new: true }
    );
    const users = await userModel.find(); // Fetch all users after update
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
