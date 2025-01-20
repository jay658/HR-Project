// routes/facilityIssueRouter.ts
import express from "express";
import FacilityIssue from "../../../models/FacilityIssue";
import { AuthRequest } from "../../../middleware/authMiddlewareHR";

const router = express.Router();

// Update facility issue status and add comment
router.patch("/:issueId", async (req: AuthRequest, res) => {
  try {
    const { issueId } = req.params;
    const { status, comment } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const facilityIssue = await FacilityIssue.findById(issueId);
    if (!facilityIssue) {
      res.status(404).json({ message: "Facility issue not found" });
      return;
    }
    console.log(status);
    // Update status if provided
    if (status) {
      if (!["open", "inProgress", "closed"].includes(status)) {
        res.status(400).json({ message: "Invalid status value" });
        return;
      }
      facilityIssue.status = status;
    }

    // Add comment if provided
    if (comment) {
      facilityIssue.comments.push({
        description: comment,
        createdBy: userId,
        timestamp: new Date(),
      });
    }

    await facilityIssue.save();

    // Return updated issue with populated fields
    const updatedIssue = await FacilityIssue.findById(issueId)
      .populate("createdBy", "username email")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username email",
        },
      });

    res.json(updatedIssue);
  } catch (error) {
    console.error("Error updating facility issue:", error);
    res.status(500).json({ message: "Error updating facility issue" });
  }
});

// Get all facility issues
router.get("/", async (req: AuthRequest, res) => {
  try {
    const facilityIssues = await FacilityIssue.find()
      .populate("createdBy", "username email")
      .populate("apartmentId", "unit")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username email",
        },
      })
      .sort({ createdAt: -1 });

    res.json(facilityIssues);
  } catch (error) {
    console.error("Error fetching facility issues:", error);
    res.status(500).json({ message: "Error fetching facility issues" });
  }
});

// Get facility issues by apartment ID
router.get("/apartment/:apartmentId", async (req: AuthRequest, res) => {
  try {
    const { apartmentId } = req.params;

    const facilityIssues = await FacilityIssue.find({ apartmentId })
      .populate("createdBy", "username email")
      .populate("apartmentId", "unit")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username email",
        },
      })
      .sort({ createdAt: -1 });

    res.json(facilityIssues);
  } catch (error) {
    console.error("Error fetching facility issues:", error);
    res.status(500).json({ message: "Error fetching facility issues" });
  }
});

// Get facility issue by ID
router.get("/:issueId", async (req: AuthRequest, res) => {
  try {
    const { issueId } = req.params;

    const facilityIssue = await FacilityIssue.findById(issueId)
      .populate("createdBy", "username email")
      .populate("apartmentId", "unit")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "username email",
        },
      });

    if (!facilityIssue) {
      res.status(404).json({ message: "Facility issue not found" });
      return;
    }

    res.json(facilityIssue);
  } catch (error) {
    console.error("Error fetching facility issue:", error);
    res.status(500).json({ message: "Error fetching facility issue" });
  }
});

export default router;
