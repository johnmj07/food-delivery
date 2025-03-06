import { Router } from "express";
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/user.model.js";

const PASSWORD_HASH_SALT_ROUNDS=10;

const router= Router();

router.post('/login', handler(async(req,res)=>{
  const {email, password}= req.body;
  //check if the email and password is present in data.js
  const user=await UserModel.findOne({email})
  //if user is available send encdata from user to FE and save it there, n with every req after login we get this data and decode it on BE/server and authenticate user, for generating that encdata/token we use jsonwebtoken
  if(user && (await bcrypt.compare(password, user.password))){
    res.send(generateTokenResponse(user))
    return;
  }
  res.status(BAD_REQUEST).send('Username and Password is Invalid')
}))

router.post('/register', handler(async(req,res)=>{
  const {name, password, email, address}=req.body;
  const user= await UserModel.findOne({email})
  if(user){
    res.status(BAD_REQUEST).send('User already exists, please Login!')
    return;
  }

  const HashedPassword= await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS)

  const newUser={
    name,
    password: HashedPassword,
    email: email.toLowerCase(),
    address
  }
  const result= await UserModel.create(newUser)
  res.send(generateTokenResponse(result))

}))

const generateTokenResponse=(user)=>{
      const token=jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
      },
    process.env.JWT_SECRET,{
      expiresIn: '30d'
    }) //sign() generates token object

    return{
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,   
      isAdmin: user.isAdmin,        
      token
    }
}

export default router;