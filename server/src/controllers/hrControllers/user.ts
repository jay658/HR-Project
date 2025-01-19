import { Request, Response } from 'express';

import EmployeeUser from '../../models/EmployeeUser';
import PersonalInfo from '../../models/PersonalInfo';

// Test Router
const testUserRouter = (_req: Request, res: Response) => {
  try {
    res.json('Successfully hit hr user router');
  } catch (err) {
    console.log(`There was an error in the hr user test route: ${err}`);
  }
};

const getEmployees = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, preferredName } = req.query;

    // First get all EmployeeUsers
    const employees = await EmployeeUser.find();
    
    // Get all personalInfoIds that aren't null
    const personalInfoIds = employees
      .filter(emp => emp.personalInfoId)
      .map(emp => emp.personalInfoId);

    // Build search query for PersonalInfo
    let searchQuery: any = {
      _id: { $in: personalInfoIds }
    };

    if (firstName || lastName || preferredName) {
      const searchTerms = {
        firstName: firstName?.toString().toLowerCase(),
        lastName: lastName?.toString().toLowerCase(),
        preferredName: preferredName?.toString().toLowerCase()
      };

      searchQuery = {
        ...searchQuery,
        $or: [
          searchTerms.firstName ? { 'name.firstName': { $regex: searchTerms.firstName, $options: 'i' } } : {},
          searchTerms.lastName ? { 'name.lastName': { $regex: searchTerms.lastName, $options: 'i' } } : {},
          searchTerms.preferredName ? { 'name.preferredName': { $regex: searchTerms.preferredName, $options: 'i' } } : {}
        ].filter(term => Object.keys(term).length > 0)
      };
    }

    // Query PersonalInfo collection with search params
    const personalInfos = await PersonalInfo.find(searchQuery).select('name SSN employment phone email');

    // Create a map for quick lookup
    const personalInfoMap = new Map(
      personalInfos.map(info => [info._id.toString(), info])
    );

    // Filter and format employees based on search results
    const formattedEmployees = employees
      .filter(employee => employee.personalInfoId && personalInfoMap.has(employee.personalInfoId.toString()))
      .map(employee => {
        const personalInfo = personalInfoMap.get(employee.personalInfoId.toString())!;
        
        return {
          id: employee._id,
          name: {
            firstName: personalInfo.name.firstName,
            lastName: personalInfo.name.lastName,
            preferredName: personalInfo.name.preferredName || '',
            fullName: `${personalInfo.name.firstName} ${personalInfo.name.lastName}`
          },
          ssn: personalInfo.SSN || 'N/A',
          workAuthorizationTitle: personalInfo.employment.residencyStatus || 'N/A',
          visaType: personalInfo.employment.visaType || null,
          otherVisaTitle: personalInfo.employment.otherVisaTitle || null,
          phoneNumber: personalInfo.phone.cell || 'N/A',
          email: employee.email
        };
      });

    res.status(200).json({
      success: true,
      totalCount: employees.length,
      filteredCount: formattedEmployees.length,
      data: formattedEmployees
    });
  } catch (err) {
    console.error(`Error in getEmployees: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch employees'
    });
  }
};

const getEmployeeDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await EmployeeUser.findById(id).populate([
      {
        path: 'personalInfoId',
        select: '-__v' // Select all fields except version
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

    // Format the response to include all profile information
    const formattedEmployee = {
      id: employee._id,
      personalInfo: employee.personalInfoId,
      onboarding: employee.onboardingId,
      visaStatus: employee.visaApplicationId,
      housing: employee.apartmentId,
      email: employee.email
    };

    res.status(200).json({
      success: true,
      data: formattedEmployee
    });
  } catch (err) {
    console.error(`Error fetching employee details: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Error fetching employee details'
    });
  }
};

export { testUserRouter, getEmployees, getEmployeeDetails };
