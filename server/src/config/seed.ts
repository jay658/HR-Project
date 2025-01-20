import {
  extraOnboardingSeed,
  extraUsersSeed
} from './extraOnboardingSeed'
import {
  seedApartments,
  seedDocuments,
  seedEmployeeUsers,
  seedFacilityIssue,
  seedHumanResources,
  seedOnboarding,
  seedPersonalInfo,
  seedVisaApplications,
} from "./seedData";

import Apartment from "../models/Apartment";
import Document from "../models/Document";
import EmployeeUser from "../models/EmployeeUser";
import FacilityIssue from "../models/FacilityIssue";
import HumanResources from "../models/HumanResources";
import Onboarding from "../models/Onboarding";
import PersonalInfo from "../models/PersonalInfo";
import { Types } from "mongoose";
import VisaApplication from "../models/VisaApplication";
import bcrypt from "bcrypt";
import connectToDB from "./connection";
import mongoose from "mongoose";

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
    await HumanResources.deleteMany();
    const apartments = await Apartment.insertMany(seedApartments);
    // const users = await EmployeeUser.insertMany(seedEmployeeUsers);
    const hashedSeedEmployeeUsers = await Promise.all(
      seedEmployeeUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10) // Hash password with bcrypt
      }))
    );

    const hashedSeedHumanResources = await Promise.all(
      seedHumanResources.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10), // Hash password with bcrypt
      }))
    );
    await HumanResources.insertMany(hashedSeedHumanResources);
    const users = await EmployeeUser.insertMany(hashedSeedEmployeeUsers);

    const documents = await Document.insertMany(
      seedDocuments.map((doc) => {
        let userId;
        if (doc.fileKey.includes('john')) {
          userId = users[0]._id;
        } else if (doc.fileKey.includes('jane')) {
          userId = users[1]._id;
        } else if (doc.fileKey.includes("michael")) {
          userId = users[2]._id;
        } else {
          userId = users[3]._id;
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
          profilePicture: userDocs.find((d) => d.type === "profilePicture")
            ?._id,
          driversLicense: {
            ...onboarding.driversLicense,
            document: userDocs.find((d) => d.type === "driverLicense")?._id,
          },
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
          profilePicture: userDocs.find((d) => d.type === 'profilePicture')
            ?._id,
          driversLicense: {
            ...info.driversLicense,
            document: userDocs.find((d) => d.type === 'driverLicense')?._id
          }
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
      const janeIdx = users.findIndex(user => user.username === 'jane.smith')
      user.apartmentId = randomApartmentId;
      user.onboardingId = onboardingItems[idx]._id;
      if(idx !== janeIdx) user.personalInfoId = personalInfos[idx]._id;

      apartments
        .find((apartment) => apartment._id === randomApartmentId)
        ?.tenants.push(user._id);
    });

    await PersonalInfo.deleteOne({email:'jane.smith@example.com'})

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
            createdBy: getRandomId(users)
          }))
        };
      })
    );

    //user without onboarding
    await EmployeeUser.create({
      username: 'not onboarded user',
      password: 'test',
      email: 'notonboarded@test.com'
    });

    const moreHashedSeedEmployeeUsers = await Promise.all(
      extraUsersSeed.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10), // Hash password with bcrypt
      }))
    );

    const moreUsers = await EmployeeUser.insertMany(moreHashedSeedEmployeeUsers);

    const extraProfilePictures = await Document.insertMany(
      extraOnboardingSeed.map((_onboarding, idx) => ({
          userId: moreUsers[idx]._id,
          type: 'profilePicture',
          status: 'approved',
          fileKey: 'some-random-key',
          fileUrl: 'https://hr-project-bucket-7g9x3l2p5.s3.us-east-2.amazonaws.com/default-user.jpeg'
        }
       )  
      )
    )

    const extraOnboardings = await Onboarding.insertMany(
      extraOnboardingSeed.map((onboarding, idx) => {
        return {
          ...onboarding,
          userId: moreUsers[idx]._id,
          driversLicense: {
            hasLicense: false
          },
          employment: {
            residencyStatus: 'citizen'
          },
          profilePicture: extraProfilePictures[idx]._id
        };
      })
    );

    for (const [idx, user] of moreUsers.entries()) {
      user.onboardingId = extraOnboardings[idx]._id;
      await user.save(); 
    }

    console.log("DB seeded");
  } catch (err) {
    console.error(`There was an error seeding the data: ${err}`);
  } finally {
    await mongoose.connection.close();
    console.log('DB connection closed');
  }
};

seed();