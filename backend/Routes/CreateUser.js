const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "mynameisjaunnaqvi@gmail.comnaqvisahab"; // Ideally, store this in environment variables

// Route to create a new user
router.post(
  '/createuser',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        location
      });

      await newUser.save();
      res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating user', error });
    }
  }
);

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: 'Invalid email or password' });
    }
    
    const payload = {
      user: {
        id: user.id,
      }
    };
    
    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ success: true, authToken });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
