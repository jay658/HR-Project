import { Request, Response } from "express";
import EmployeeUser from "../../models/EmployeeUser";

// Get all employees with optional search parameters
const getEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, preferredName } = req.query;
        
        // Build search query
        const searchQuery: any = {};
        
        // Add search conditions if parameters are provided
        if (firstName) {
            searchQuery['personalInfoId.firstName'] = new RegExp(firstName as string, 'i');
        }
        if (lastName) {
            searchQuery['personalInfoId.lastName'] = new RegExp(lastName as string, 'i');
        }
        if (preferredName) {
            searchQuery['personalInfoId.preferredName'] = new RegExp(preferredName as string, 'i');
        }

        // Fetch employees with populated personal info
        const employees = await EmployeeUser
            .find(searchQuery)
            .populate({
                path: 'personalInfoId',
                select: 'firstName lastName preferredName email phoneNumber address'
            })
            .sort({ 'personalInfoId.lastName': 1 }); // Sort by last name alphabetically

        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (err) {
        console.error(`Error fetching employees: ${err}`);
        res.status(500).json({
            success: false,
            error: 'Error fetching employees'
        });
    }
};

// Get single employee details
const getEmployeeDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const employee = await EmployeeUser
            .findById(id)
            .populate([
                {
                    path: 'personalInfoId',
                    select: 'firstName lastName preferredName email phoneNumber address'
                },
                {
                    path: 'onboardingId',
                    select: 'status startDate completedForms'
                },
                {
                    path: 'visaApplicationId',
                    select: 'status visaType expirationDate'
                },
                {
                    path: 'apartmentId',
                    select: 'address unit moveInDate'
                }
            ]);

        if (!employee) {
            res.status(404).json({
                success: false,
                error: 'Employee not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (err) {
        console.error(`Error fetching employee details: ${err}`);
        res.status(500).json({
            success: false,
            error: 'Error fetching employee details'
        });
    }
};

// Test Router (keeping for testing purposes)
const testUserRouter = (_req: Request, res: Response): void => {
    try {
        res.json('Successfully hit hr user router');
    } catch (err) {
        console.error(`There was an error in the hr user test route: ${err}`);
        res.status(500).json({
            success: false,
            error: 'Test route error'
        });
    }
};

export {
    testUserRouter,
    getEmployees,
    getEmployeeDetails
};