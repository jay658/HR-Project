import { seedApartments, seedEmployeeUsers, seedOnboarding, seedVisaApplications } from './seedData'

import Apartment from '../models/Apartment'
import EmployeeUser from '../models/EmployeeUser'
import Onboarding from '../models/Onboarding'
import VisaApplication from '../models/VisaApplication'
import db from './connection'

const seed = async () => {
  try {
    await VisaApplication.deleteMany()
    await Onboarding.deleteMany()
    await Apartment.deleteMany()
    await EmployeeUser.deleteMany()
    
    const apartments = await Apartment.create(seedApartments)
    const users = await EmployeeUser.create(seedEmployeeUsers)
    const onboardingItems = await Onboarding.create(seedOnboarding.map((onboarding, idx) => ({
      ...onboarding,
      userId: users[idx]._id
    })))

    const visaApplications = await VisaApplication.insertMany(seedVisaApplications.map((visa, idx) => ({
      ...visa,
      userId: users[idx]._id
    })))

    users.forEach((user, idx) => {
      user.apartmentId = apartments[idx]._id
      user.onboardingId = onboardingItems[idx]._id
      user.visaApplicationId = visaApplications[idx]._id
    })

    await Promise.all(users.map(user => user.save()))

    apartments.forEach((apartment, idx) => {
      apartment.tenants.push(users[idx]._id)
    })

    await Promise.all(apartments.map(apartment => apartment.save()))

    //user without onboarding
    await EmployeeUser.create({
      username:"not onboarded user",
      password: "test",
      email: 'notonboarded@test.com'
    })
    
    console.log('DB seeded')
  } catch (err) {
    console.error(`There was an error seeding the data: ${err}`)
  } finally {
    if(db && db.close) await db.close()
  }
}

seed()