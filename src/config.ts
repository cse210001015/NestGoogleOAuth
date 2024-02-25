import * as dotenv from 'dotenv';
import { EnvironmentVariables } from './env.interface';

function setConfigs(): EnvironmentVariables {
  dotenv.config();

  const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
  const REDIRECT_URL = process.env.REDIRECT_URL;
  const JWT_SECRET = process.env.JWT_SECRET;
  const REFRESH_SECRET = process.env.REFRESH_SECRET;

  return {
    OAUTH_CLIENT_ID: OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET: OAUTH_CLIENT_SECRET,
    REDIRECT_URL: REDIRECT_URL,
    JWT_SECRET: JWT_SECRET,
    REFRESH_SECRET: REFRESH_SECRET,
  };
}

export default setConfigs;
