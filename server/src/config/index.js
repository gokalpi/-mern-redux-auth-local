import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const dbUrl = process.env.MONGO_URI;

export const logger = {
  logDirName: process.env.LOG_DIR_NAME,
  errorlogFileName: process.env.ERROR_LOG_FILE_NAME,
  logFileName: process.env.LOG_FILE_NAME,
  logMaxSize: process.env.LOG_MAX_SIZE,
  logMaxFiles: process.env.LOG_MAX_FILES,
  logDatePattern: process.env.LOG_DATE_PATTERN,
};

export const jwt = {
  secret: process.env.JWT_SECRET,
  tokenExpirationMinutes: process.env.JWT_TOKEN_EXPIRATION_MINUTES,
  refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
};
