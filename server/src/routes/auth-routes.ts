import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const userData = await User.findOne({ where: { username: req.body.username } });
  const { username } = req.body;

  try {

  if (!userData) {
    // the error message shouldn't specify if the login failed because of wrong email or password
    res.status(404).json({ message: 'Login failed. Please try again!' });
    return;
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    userData.password
  );
  if (!validPassword) {
    res.status(400).json({ message: 'Login failed. Please try again!' });
    return;
  }
  res.status(200).json({ message: 'You are now logged in!' });

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    return res.json({ token });

} catch (err) {

    return res.status(400).json(err);

}

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
