import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import * as config from './index.js';
import logger from './logger.js';
import * as UserService from '../services/user.js';

const usePassportStrategies = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    UserService.getUser(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        logger.error('deserializeUser - error', err);
        done(null, false, { error: err });
      });
  });

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
      },
      async (payload, done) => {
        try {
          const user = await UserService.getUser(payload.id);

          if (user) {
            delete user.password;
            return done(null, user, { message: 'Logged in Successfully' });
          } else {
            return done(null, false, { message: 'User not found' });
          }
        } catch (err) {
          logger.error('JwtStrategy - error', err);
          done(err, null);
        }
      },
    ),
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // find a user by email address
          const user = await UserService.getUserByEmail(email);

          if (!user) {
            return done(null, false, {
              message: 'Incorrect email and/or password.',
            });
          }

          // check if user's password is equal to the entered password
          const isMatch = await user.comparePassword(password);

          if (!isMatch) {
            return done(null, false, {
              message: 'Incorrect email and/or password.',
            });
          }

          return done(null, user, { message: 'Logged in successfully' });
        } catch (err) {
          logger.error('LocalStrategy - error', err);
          return done(err);
        }
      },
    ),
  );
};

export default usePassportStrategies;
