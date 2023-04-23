import { Role } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import env from './validateEnv';
interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export interface JwtPayload {
  id: number;
  name: string;
  role: Role;
  email: string;
  classId?: number
}

// Error Handler Function
export function throwHttpError(statusCode: number, message: string): CustomError {
  if (typeof statusCode !== 'number') {
    throw new TypeError('statusCode must be a number');
  }

  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

// Generate JWT Token
export function generateToken(Payload: JwtPayload) {
  const token = jwt.sign(Payload, env.JWT_SECRET, { expiresIn: '1w' });
  return token;

}

// Verify JWT Token
export function verifyToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null;
  }
}




