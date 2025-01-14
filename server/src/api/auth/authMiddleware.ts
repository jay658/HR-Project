import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request to include `user`
interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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

    (req as AuthRequest).user = decoded; // Type assertion to add `user`
    next(); // Proceed to the next middleware/handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
