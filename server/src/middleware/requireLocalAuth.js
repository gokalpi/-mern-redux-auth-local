import passport from 'passport';

const requireLocalAuth = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('requireLocalAuth - err', err);
    console.log('requireLocalAuth - user', user);
    console.log('requireLocalAuth - info', info);

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json(info.message);
    }

    req.user = user;

    next();
  })(req, res, next);
};

export default requireLocalAuth;
