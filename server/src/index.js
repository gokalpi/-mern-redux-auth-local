import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

import * as config from './config/index.js';
import connectDB from './config/database.js';
import usePassportStrategies from './config/passport.js';
import routes from './routes/index.js';

const app = express();

// secure apps by setting various HTTP headers
app.use(helmet());

// logger
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser());

// gzip compression
app.use(compression());

// allow cors requests from any origin and with credentials
app.use(cors());

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());

usePassportStrategies(passport);

connectDB();

// Serve static assets if in production
if (config.env === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Use Routes
app.use('/', routes);

const port = config.port;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
