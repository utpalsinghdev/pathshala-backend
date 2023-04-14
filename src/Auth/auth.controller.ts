import { NextFunction, Request, Response } from 'express';
import * as AuthServices from './auth.services'
import createHttpError from 'http-errors';
import { Role } from '@prisma/client';
import { CreateUserSchema, loginSchema, userUpdateSchema } from '../utils/schema';

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error } = loginSchema.validate(req.body)
    if (error) {
      return next(createHttpError(400, error.message))
    }
    const body = req.body
    const { token, user } = await AuthServices.login(body.email, body.password)

    if (user) {
      res.status(200).json({
        success: true,
        message: "Logged in Successfully",
        token,
        data: user
      })
    }
  } catch (error) {
    next(createHttpError(error.statusCode || 500, error.message))
  }
}

interface AuthenticatedRequest extends Request {
  payload: {
    role: Role;
  };
}



async function createUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (req.payload.role !== Role.ADMIN) {
      return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
    }

    const { error } = CreateUserSchema.validate(req.body)

    if (error) {
      return next(createHttpError(400, error.message))
    }

    const { name, email, password, role, classId } = req.body;



    const user = await AuthServices.register(name, email, password, role, classId);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(createHttpError(error.statusCode || 500, error.message));
  }
}

async function getAllUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.payload.role !== Role.ADMIN) {
    return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
  }

  const users = await AuthServices.getAllUsers()

  res.status(200).json({
    success: true,
    message: "All Fetched Successfully",
    data: users,
  })


}




async function updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (req.payload.role !== Role.ADMIN) {
      return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
    }
    const { error } = userUpdateSchema.validate(req.body)
    if (error) {
      return next(createHttpError(400, error.message))
    }
    const id = parseInt(req.params.id)

    const user = await AuthServices.updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(createHttpError(error.statusCode || 500, error.message));
  }
}
async function deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (req.payload.role !== Role.ADMIN) {
      return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
    }

    const id = parseInt(req.params.id)

    const user = await AuthServices.deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    next(createHttpError(error.statusCode || 500, error.message));
  }
}
async function getOneUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (req.payload.role !== Role.ADMIN) {
      return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
    }

    const id = parseInt(req.params.id)

    const user = await AuthServices.getUserByUniqueId(id);

    res.status(200).json({
      success: true,
      message: "User Fetched successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        classId: user.classId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
    });
  } catch (error) {
    next(createHttpError(error.statusCode || 500, error.message));
  }
}




export {
  createUser,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  getOneUser
}