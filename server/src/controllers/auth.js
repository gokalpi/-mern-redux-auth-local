import httpStatus from 'http-status';

import logger from '../config/logger.js';
import * as UserService from '../services/user.js';

export const getCurrentUser = (req, res) => {
  const currentUser = req.user.toJSON();
  res.send({ ...currentUser });
};

export const login = (req, res) => {
  if (req.user) {
    const user = req.user.toJSON();
    const token = req.user.generateJWTToken();

    res.send({
      ...user,
      token,
    });
  } else {
    logger.error('Auth controller.login - User not found');
    res.status(httpStatus.UNAUTHORIZED).send('Authentication error');
  }
};

export const logout = (req, res) => {
  try {
    req.logout();
    res.send({ message: 'Successfully logged out' });
  } catch (err) {
    logger.error('Auth controller.logout - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Email is already in use' });
    }

    const newUser = await UserService.createUser({
      name,
      email,
      password,
      role: 'USER',
      avatar,
    });

    if (!newUser) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'User cannot be created' });
    }

    const user = newUser.toJSON();
    const token = newUser.generateJWTToken();

    res.send({
      ...user,
      token,
    });
  } catch (err) {
    logger.error('Auth controller.register - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};
