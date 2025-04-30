const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'Signup successful', user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'None',
    secure: true,
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'User verified', userId: decoded.id });
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};
