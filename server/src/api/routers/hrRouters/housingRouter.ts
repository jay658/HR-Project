import { Request, Response, Router } from "express";
import Apartment from "../../../models/Apartment";
import EmployeeUser from "../../../models/EmployeeUser";
import FacilityIssue from "../../../models/FacilityIssue";
import mongoose from "mongoose";

const housingRouter = Router();

// Get all houses
housingRouter.get("/", async (req: Request, res: Response) => {
  try {
    const houses = await Apartment.find().populate("tenants");
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching houses" });
  }
});

// Add new house
housingRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { unit, capacity, address } = req.body;
    const newHouse = new Apartment({
      unit,
      capacity,
      address,
      status: "available",
    });
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (error) {
    res.status(500).json({ message: "Error creating house" });
  }
});

// Delete house and reassign tenants
housingRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const houseId = req.params.id;
    const house = await Apartment.findById(houseId);

    if (!house) {
      res.status(404).json({ message: "House not found" });
      return;
    }

    // Get all available houses except the one being deleted
    const availableHouses = await Apartment.find({
      _id: { $ne: houseId },
      status: "available",
    });

    // Reassign tenants randomly
    if (house.tenants.length > 0) {
      for (const tenantId of house.tenants) {
        const availableHouse =
          availableHouses[Math.floor(Math.random() * availableHouses.length)];
        if (availableHouse) {
          await EmployeeUser.findByIdAndUpdate(tenantId, {
            apartmentId: availableHouse._id,
          });
          availableHouse.tenants.push(tenantId);
          await availableHouse.save();
        }
      }
    }

    await Apartment.findByIdAndDelete(houseId);
    res.json({ message: "House deleted and tenants reassigned" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting house" });
  }
});

// Get specific house by ID with tenant information
// Get specific house by ID with tenant information and facility issues
housingRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const houseId = req.params.id;

    // Find the house by ID and populate tenant information
    const house = await Apartment.findById(houseId).populate({
      path: "tenants",
      model: "EmployeeUser",
      select: "username email personalInfoId",
      populate: {
        path: "personalInfoId",
        model: "PersonalInfo",
      },
    });

    if (!house) {
      res.status(404).json({ message: "House not found" });
      return;
    }

    // Find all facility issues for this apartment
    const facilityIssues = await FacilityIssue.find({
      apartmentId: houseId,
    }).populate({
      path: "createdBy",
      model: "EmployeeUser",
      select: "username email",
    });

    // Combine house data with facility issues
    const response = {
      ...house.toObject(),
      facilityIssues,
    };

    res.json(response);
  } catch (error) {
    // Check if error is due to invalid ObjectId format
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: "Invalid house ID format" });
      return;
    }
    res.status(500).json({ message: "Error fetching house details" });
  }
});

export default housingRouter;
