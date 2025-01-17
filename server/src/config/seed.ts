import {
  seedApartments,
  seedDocuments,
  seedEmployeeUsers,
  seedFacilityIssue,
  seedOnboarding,
  seedPersonalInfo,
  seedVisaApplications,
} from "./seedData";

<<<<<<< HEAD
import bcrypt from "bcrypt";

import Apartment from "../models/Apartment";
import Document from "../models/Document";
import EmployeeUser from "../models/EmployeeUser";
import FacilityIssue from "../models/FacilityIssue";
import Onboarding from "../models/Onboarding";
import PersonalInfo from "../models/PersonalInfo";
import { Types } from "mongoose";
import VisaApplication from "../models/VisaApplication";
import connectToDB from "./connection";
import mongoose from "mongoose";
=======
import Apartment from '../models/Apartment';
import Document from '../models/Document';
import EmployeeUser from '../models/EmployeeUser';
import FacilityIssue from '../models/FacilityIssue';
import Onboarding from '../models/Onboarding';
import PersonalInfo from '../models/PersonalInfo';
import { Types } from 'mongoose';
import VisaApplication from '../models/VisaApplication';
import connectToDB from './connection';
import mongoose from 'mongoose';
>>>>>>> main

const seed = async () => {
  try {
    await connectToDB();
    await VisaApplication.deleteMany();
    await Onboarding.deleteMany();
    await Apartment.deleteMany();
    await EmployeeUser.deleteMany();
    await Document.deleteMany();
    await PersonalInfo.deleteMany();
    await FacilityIssue.deleteMany();
    const apartments = await Apartment.insertMany(seedApartments);
<<<<<<< HEAD
    // const users = await EmployeeUser.insertMany(seedEmployeeUsers);
    const hashedSeedEmployeeUsers = await Promise.all(
      seedEmployeeUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10), // Hash password with bcrypt
      }))
    );

    const users = await EmployeeUser.insertMany(hashedSeedEmployeeUsers);
    const onboardingItems = await Onboarding.insertMany(
      seedOnboarding.map((onboarding, idx) => ({
        ...onboarding,
        userId: users[idx]._id,
      }))
    );
=======
    const users = await EmployeeUser.insertMany(seedEmployeeUsers);
>>>>>>> main

    const documents = await Document.insertMany(
      seedDocuments.map((doc) => {
        let userId;
        if (doc.fileKey.includes("john")) {
          userId = users[0]._id;
        } else if (doc.fileKey.includes("jane")) {
          userId = users[1]._id;
        } else {
          userId = users[2]._id;
        }
        return { ...doc, userId };
      })
    );

    const onboardingItems = await Onboarding.insertMany(
      seedOnboarding.map((onboarding, idx) => {
        const userDocs = documents.filter((d) =>
          d.userId.equals(users[idx]._id)
        );
        return {
          ...onboarding,
          userId: users[idx]._id,
          profilePicture: userDocs.find((d) => d.type === 'profilePicture')
            ?._id,
          driversLicense: {
            ...onboarding.driversLicense,
            document: userDocs.find((d) => d.type === 'driverLicense')?._id
          }
        };
      })
    );

    const personalInfos = await PersonalInfo.insertMany(
      seedPersonalInfo.map((info, idx) => {
        const userDocs = documents.filter((d) =>
          d.userId.equals(users[idx]._id)
        );

        return {
          ...info,
          userId: users[idx]._id,
          profilePicture: userDocs.find((d) => d.type === "profilePicture")
            ?._id,
          driversLicense: {
            ...info.driversLicense,
            document: userDocs.find((d) => d.type === "driverLicense")?._id,
          },
        };
      })
    );

    const visaApplications = await VisaApplication.insertMany(
      seedVisaApplications
    );

    const getRandomId = <T extends { _id: Types.ObjectId }>(items: T[]) =>
      items[Math.floor(Math.random() * items.length)]._id;

    users.forEach((user, idx) => {
      const randomApartmentId = getRandomId(apartments);
      user.apartmentId = randomApartmentId;
      user.onboardingId = onboardingItems[idx]._id;
      user.personalInfoId = personalInfos[idx]._id;

      apartments
        .find((apartment) => apartment._id === randomApartmentId)
        ?.tenants.push(user._id);
    });

    await Promise.all(users.map((user) => user.save()));

    await Promise.all(apartments.map((apartment) => apartment.save()));

    const facilityIssues = await FacilityIssue.insertMany(
      seedFacilityIssue.map((issue) => {
        const createdUserId = getRandomId(users);
        return {
          ...issue,
          createdBy: createdUserId,
          apartmentId: users.find((user) => user._id === createdUserId)
            ?.apartmentId,
          comments: issue.comments.map((comment) => ({
            ...comment,
<<<<<<< HEAD
            createdBy: getRandomId(users),
          })),
=======
            createdBy: getRandomId(users)
          }))
>>>>>>> main
        };
      })
    );

    //user without onboarding
    await EmployeeUser.create({
      username: "not onboarded user",
      password: "test",
      email: "notonboarded@test.com",
    });

    console.log("DB seeded");
  } catch (err) {
    console.error(`There was an error seeding the data: ${err}`);
  } finally {
    await mongoose.connection.close();
    console.log("DB connection closed");
  }
};

seed();
