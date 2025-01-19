import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import config from "../../utility/configs";
import jwt from "jsonwebtoken";
import EmployeeUser from "../../models/EmployeeUser";
import HumanResources from "../../models/HumanResources";

// Test Router
const testUserRouter = (_req: Request, res: Response) => {
  try {
    res.json("Successfully hit hr user router");
  } catch (err) {
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeUser.find();

    res.json(employees);
  } catch (err) {
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await HumanResources.findOne({ username });
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
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { testUserRouter, getEmployees, login };
