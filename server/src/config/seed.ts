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
    
    const apartments = await Apartment.insertMany(seedApartments)
    const users = await EmployeeUser.insertMany(seedEmployeeUsers)
    const onboardingItems = await Onboarding.insertMany(seedOnboarding.map((onboarding, idx) => ({
      ...onboarding,
      userId: users[idx]._id
    })))

    const visaApplications = await VisaApplication.insertMany(seedVisaApplications.map((onboarding, idx) => ({
      ...onboarding,
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
    
    console.log('DB seeded')
  } catch (err) {
    console.error(`There was an error seeding the data: ${err}`)
  } finally {
    if(db && db.close) await db.close()
  }
}

seed()