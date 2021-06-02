require('dotenv').config()

const { Router } = require("express");
const router = Router();
const User = require('../db/models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const tokenCheck = require('../middleware/auth.middleware');

const secretKey = process.env.SECRETKEY;
function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    // role: user.role,
  };
}

router
  .route('/signup')
  .post(
    body('email', 'Wrong email').isEmail(),
    body('password', 'Password must be longer than 5').isLength({ min: 5 }),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return  res.status(400).json({ message: 'Uncorrect request', errors });
        }

        const { username, email, password, role } = req.body;

        const candidate = await User.findOne({ email })
        if(candidate) {
          return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const user = await User.create({
          username,
          email,
          password: hashPassword,
          // role,
        });
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        const newUser = serializeUser(user);

        return res.sendStatus(200).json({
          newUser,
          token,
        });
      } catch (e) {
        console.log(e)
        return res.send({message: "Server error"})
      }
    });

router
  .route('/login')
  .post(
    body('email', 'Wrong email').isEmail(),
    body('password', 'Password must be longer than 5').isLength({ min: 5 }),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return  res.status(400).json({ message: 'Uncorrect request', errors });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if(!user) {
          return res.status(404).json({message: `User not found`})
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
          return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        const existedUser = serializeUser(user);

        return res.sendStatus(200).json({
          existedUser,
          token,
        });
      } catch (e) {
        console.log(e)
        return res.send({message: "Server error"})
      }
    });

router
  .route('/auth', tokenCheck, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const token = jwt.sign({ id: user.id}, secretKey, { expiresIn: '1h' });
      const existedUser = serializeUser(user);

      return res.json({
        existedUser,
        token,
      });
    } catch (e) {
      console.log(e);
      return res.send({message: "Server error"});
    }
  });

module.exports = router;

