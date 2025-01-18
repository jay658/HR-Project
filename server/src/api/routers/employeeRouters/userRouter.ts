import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import EmployeeUser from "../../../models/EmployeeUser";
import { authenticateToken } from "../../auth/authMiddleware";
import Apartment from "../../../models/Apartment";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

const userRouter = express.Router();

userRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const user = await EmployeeUser.findOne({ username });
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          onboardingId: user.onboardingId,
          personalInfoId: user.personalInfoId,
          visaApplicationId: user.visaApplicationId,
          apartmentId: user.apartmentId,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get user's housing and roommate information
userRouter.get(
  "/housing",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Explicitly return to satisfy TypeScript
      }

      // Get current user
      const currentUser = await EmployeeUser.findById(userId);
      if (!currentUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (!currentUser.apartmentId) {
        res.status(200).json({
          message: "No housing assignment found",
          housingDetails: null,
        });
        return;
      }

      // Get apartment details and all roommates
      const apartment = await Apartment.findById(currentUser.apartmentId);
      if (!apartment) {
        res.status(404).json({ message: "Apartment not found" });
        return;
      }

      const roommates = await EmployeeUser.find({
        apartmentId: currentUser.apartmentId,
      }).select("username email _id");

      // Return housing details with roommate information
      res.json({
        housingDetails: {
          apartment: {
            _id: apartment._id,
            unit: apartment.unit,
            capacity: apartment.capacity,
            address: apartment.address,
            status: apartment.status,
          },
          currentUser: {
            id: currentUser._id,
            username: currentUser.username,
            email: currentUser.email,
          },
          roommates: roommates.map((roommate) => ({
            id: roommate._id,
            username: roommate.username,
            email: roommate.email,
            isCurrentUser: roommate._id.toString() === userId,
          })),
        },
      });
    } catch (error) {
      console.error("Housing info error:", error);
      res.status(500).json({ message: "Error fetching housing information" });
      return;
    }
  }
);

export default userRouter;
