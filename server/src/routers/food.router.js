import { Router } from "express";
import { sample_foods, sample_tags } from "../data.js";
import handler from "express-async-handler";
import { FoodModel } from "../models/food.model.js";


const router=Router();

router.get('/', handler(async(req,res)=>{
  const foods= await FoodModel.find({})
  res.send(foods)
}))

router.get('/tags', handler(async(req,res)=>{
  const tags= await FoodModel.aggregate([
    {
      $unwind: '$tags',//make them flat
    },{
      $group:{ //group them with id & count
        _id: '$tags',
        count: {$sum: 1}
      }
    },{
      $project:{
        _id:0,
        name: '$_id',
        count: '$count'
      }
    }
  ]).sort({count:-1})

  const all={
    name: 'All',
    count: await FoodModel.countDocuments()
  }

  tags.unshift(all)
  res.send(tags)
}))

router.get('/search/:searchTerm',handler(async (req,res)=>{
  const {searchTerm} = req.params;
  const searchRegex= new RegExp(searchRegex, 'i')
  const foods= await FoodModel.find({
    name:{$regex: searchRegex}
  })
  res.send(foods)
}))

router.get('/tags/:tag',handler(async(req,res)=>{
  const {tag}= req.params;
  const foods= await FoodModel.find({tags: tag})
  res.send(foods)
}))

router.get('/:foodId', handler(async(req,res)=>{
  const {foodId}= req.params;
  const food=await FoodModel.findById(foodId)
  res.send(food)
}))

export default router;