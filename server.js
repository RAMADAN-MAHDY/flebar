const express = require('express');
const bcrypt = require('bcrypt');
const next = require('next');
const mongoose = require('mongoose');
const conditions = require('./models/condition');
const User = require('./models/createuser'); // تأكد من أنك تستخدم المسار الصحيح

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb+srv://ramadanmahdy786:Phdem11xmgX8hpQ1@flebar.smumdpj.mongodb.net/?retryWrites=true&w=majority&appName=flebar').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.prepare().then(() => {
  const server = express();

  server.use(express.json()); // لتمكين معالجة JSON

  // API route to create a new condition
  server.post('/api/condition', async (req, res) => {
    try {
      const { order, modelnumber, name, quantity, condition } = req.body;

      const findCommand = await conditions.findOne({ order });
      if (findCommand) {
        return res.status(400).json(`${order} هذا الامر موجود بالفعل`);
      }
      await conditions.create({ order, modelnumber, name, quantity, condition });
      res.status(201).json({ order, modelnumber, name, quantity, condition });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // API route to get all conditions
  server.get('/api/condition', async (req, res) => {
    try {
      const data = await conditions.find({});
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  // API route to update a condition by ID
  server.put('/api/condition/:id', async (req, res) => {
    try {
      const { condition } = req.body;
      const { id } = req.params;

      const updatedCondition = await conditions.findByIdAndUpdate(
        id,
        { condition },
        { new: true }
      );

      if (!updatedCondition) {
        return res.status(404).json('Condition not found');
      }

      res.json(updatedCondition);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });

  // API route to create a new user
  server.post('/api/users', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const findUser = await User.findOne({ email });
      if (findUser) {
        return res.status(400).json("wrong email or password");
      }

      const hashedpassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedpassword });

      return res.status(201).json('تم انشاء الحساب');
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
   // API route for login
   server.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isPasswordValid =bcrypt.compare(password,user.password) 
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'An error occurred while logging in' });
    }
  });

  // Handle Next.js pages and other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
