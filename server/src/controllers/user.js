import httpStatus from 'http-status';

import logger from '../config/logger.js';
import * as UserService from '../services/user.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Email is in use' });
    }

    const newUser = await UserService.createUser({
      name,
      email,
      password,
      role: 'USER',
      avatar,
    });

    res.status(httpStatus.CREATED).send(newUser.toJSON());
  } catch (err) {
    logger.error('User controller.createUser - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const tempUser = await UserService.getUser(id);

    if (!tempUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: `User with id ${id} not found` });
    }

    if (!(tempUser.id === req.user.id || req.user.role === 'ADMIN')) {
      return res
        .status(httpStatus.FORBIDDEN)
        .send({ message: 'You do not have privileges to delete this user.' });
    }

    const user = await UserService.deleteUser(id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: `User with id ${id} not found` });
    }

    res.send(tempUser);
  } catch (err) {
    logger.error('User controller.deleteUser - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const result = await UserService.getUsers(page, limit);

    res.send({
      result: result.map((user) => user.toJSON()),
      page,
      limit,
      totalPages: Math.ceil(result.length / limit),
      totalItems: result.length,
    });
  } catch (err) {
    logger.error('User controller.getUsers - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserService.getUser(id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: `User with id ${id} not found` });
    }

    res.send(user.toJSON());
  } catch (err) {
    logger.error('User controller.getUser - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const tempUser = await UserService.getUser(id);

    if (!tempUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: `User with id ${id} not found` });
    }

    if (!(tempUser.id === req.user.id || req.user.role === 'ADMIN')) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'You do not have privileges to edit this user.' });
    }

    const existingEmail = await UserService.getUserByEmail(req.body.email);

    if (existingEmail && existingEmail.id !== tempUser.id) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: 'Email alredy taken.' });
    }

    const user = await UserService.updateUser(id, req.body);

    res.send(user.toJSON());
  } catch (err) {
    logger.error('User controller.updateUser - error', err);
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong.'
        : err.message;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message });
  }
};
