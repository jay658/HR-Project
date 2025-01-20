import { NextFunction, Request, Response } from "express";

import EmployeeUser from "../models/EmployeeUser";
import jwt from "jsonwebtoken";

// Extend Request to include `user`
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

const ignoreRoutes = ['/login', '/registration', '/test']

export const authenticateToken = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  if(ignoreRoutes.some((route) => req.path.includes(route)) || req.path.includes('register')) return next()

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authentication token required" });
    return; // Explicitly return here to ensure a proper flow
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: string; username: string };

    const id = decoded.userId
    const user = await EmployeeUser.findById(id);

    if(!user) {
      res.status(401).json({ message: "User not found" })
      return
    }

    (req as AuthRequest).user = decoded; // Type assertion to add `user`
    next(); // Proceed to the next middleware/handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
