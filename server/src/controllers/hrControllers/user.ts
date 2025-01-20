import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import config from "../../utility/configs";
import jwt from "jsonwebtoken";
import EmployeeUser from "../../models/EmployeeUser";
import HumanResources from "../../models/HumanResources";
import PersonalInfo from "../../models/PersonalInfo";

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
    const { firstName, lastName, preferredName } = req.query;

    const employees = await EmployeeUser.find({
      personalInfoId: { $ne: null },
    });

    const personalInfoIds = employees.map((emp) => emp.personalInfoId);

    let searchQuery: any = {
      _id: { $in: personalInfoIds },
    };

    if (firstName || lastName || preferredName) {
      const searchTerms = {
        firstName: firstName?.toString().toLowerCase(),
        lastName: lastName?.toString().toLowerCase(),
        preferredName: preferredName?.toString().toLowerCase(),
      };

      searchQuery = {
        ...searchQuery,
        $or: [
          searchTerms.firstName
            ? {
                "name.firstName": {
                  $regex: searchTerms.firstName,
                  $options: "i",
                },
              }
            : {},
          searchTerms.lastName
            ? {
                "name.lastName": {
                  $regex: searchTerms.lastName,
                  $options: "i",
                },
              }
            : {},
          searchTerms.preferredName
            ? {
                "name.preferredName": {
                  $regex: searchTerms.preferredName,
                  $options: "i",
                },
              }
            : {},
        ].filter((term) => Object.keys(term).length > 0),
      };
    }

    const personalInfos = await PersonalInfo.find(searchQuery).select(
      "name SSN employment phone email"
    );

    const personalInfoMap = new Map(
      personalInfos.map((info) => [info._id.toString(), info])
    );

    // format employees based on search results
    const formattedEmployees = employees
      .filter((employee) =>
        personalInfoMap.has(employee.personalInfoId.toString())
      )
      .map((employee) => {
        const personalInfo = personalInfoMap.get(
          employee.personalInfoId.toString()
        )!;

        return {
          id: employee._id,
          name: {
            firstName: personalInfo.name.firstName,
            lastName: personalInfo.name.lastName,
            preferredName: personalInfo.name.preferredName || "",
            fullName: `${personalInfo.name.firstName} ${personalInfo.name.lastName}`,
          },
          ssn: personalInfo.SSN || "N/A",
          workAuthorizationTitle:
            personalInfo.employment.residencyStatus || "N/A",
          visaType: personalInfo.employment.visaType || null,
          otherVisaTitle: personalInfo.employment.otherVisaTitle || null,
          phoneNumber: personalInfo.phone.cell || "N/A",
          email: employee.email,
        };
      });

    res.status(200).json({
      success: true,
      totalCount: employees.length,
      filteredCount: formattedEmployees.length,
      data: formattedEmployees,
    });
  } catch (err) {
    console.error(`Error in getEmployees: ${err}`);
    res.status(500).json({
      success: false,
      error: "Failed to fetch employees",
    });
  }
};

const getEmployeeDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await EmployeeUser.findById(id);

    if (!employee || !employee.personalInfoId) {
      res.status(404).json({
        success: false,
        error: "Employee not found or no personal info available",
      });
      return;
    }

    const personalInfo = await PersonalInfo.findById(
      employee.personalInfoId
    ).select("-__v -userId -_id -documents -profilePicture +SSN");

    if (!personalInfo) {
      res.status(404).json({
        success: false,
        error: "Personal information not found",
      });
      return;
    }

    const formattedEmployee = {
      name: personalInfo.name,
      email: personalInfo.email,
      gender: personalInfo.gender,
      dateOfBirth: personalInfo.dob,
      address: personalInfo.address,
      phone: personalInfo.phone,
      SSN: personalInfo.SSN,
      employment: {
        residencyStatus: personalInfo.employment.residencyStatus,
        visaType: personalInfo.employment.visaType || null,
        otherVisaTitle: personalInfo.employment.otherVisaTitle || null,
        startDate: personalInfo.employment.startDate || null,
        endDate: personalInfo.employment.endDate || null,
      },
      carInfo: personalInfo.carInfo || null,
      driversLicense: personalInfo.driversLicense
        ? {
            hasLicense: personalInfo.driversLicense.hasLicense || false,
            number: personalInfo.driversLicense.number || null,
            expirationDate: personalInfo.driversLicense.expirationDate || null,
          }
        : null,
      reference: personalInfo.reference || null,
      emergencyContacts: personalInfo.emergencyContact || [],
    };

    res.status(200).json({
      success: true,
      data: formattedEmployee,
    });
  } catch (err) {
    console.error(`Error fetching employee details: ${err}`);
    res.status(500).json({
      success: false,
      error: "Error fetching employee details",
    });
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
export { testUserRouter, getEmployees, getEmployeeDetails, login };
