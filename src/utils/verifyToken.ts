import { Request, Response, NextFunction } from 'express';
import { verifyToken } from "./utils";
interface AuthenticatedRequest extends Request {
    [x: string]: any;
    payload: any;
}
export const verify = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(404).json({success : false, message: 'Authentication failed: Missing token' });
    }

    const payload = verifyToken(token);
    if (!payload) {
        return res.status(401).json({ success : false, message: 'Authentication failed: Invalid token Or Expired' });
    }

    // console.log(payload)
    req.payload = payload;

    next();
};
