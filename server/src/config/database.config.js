import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { sample_foods, sample_users } from "../data.js";
import bcrypt from 'bcryptjs';
import { FoodModel } from "../models/food.model.js";

const PASSWORD_HASH_SALT_ROUNDS=10;

set('strictQuery', true);

export const dbconnect=async()=>{
  try {
    connect(process.env.MONGODB_URI)
    await seedUser();
    await seedFood();
    console.log('Connected to DB successfully---');
    
  } catch (error) {
    console.log(error);
    
  }
}

async function seedUser(){
  const userCount= await UserModel.countDocuments()
  if(userCount>0){
    console.log('Users seed is ALREADY done');
    return;
  }

  for (const user of sample_users) {
    user.password= await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS)
    await UserModel.create(user)
  }
  console.log('Users seed is done!😊');
  
}

async function seedFood(){
  const foods= await FoodModel.countDocuments();
  if(foods>0){
    console.log('Foods seed is ALREADY done');
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl= `/foods/${food.imageUrl}`
    await FoodModel.create(food)
  }
  console.log('Foods seed is done!😊');
}
