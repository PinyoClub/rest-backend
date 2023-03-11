import { auth } from 'express-oauth2-jwt-bearer';
import * as dotenv from 'dotenv';
dotenv.config();

export default auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_URL
})