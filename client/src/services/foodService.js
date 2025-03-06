// import { sample_foods, sample_tags } from "../../../server/src/data";
import axios from 'axios';

export const getAll= async()=> {
  const {data}= await axios.get('/api/foods')
  return data;
}//sample_foods;

export const search= async (searchTerm) => {
  const {data}= await axios.get('/api/foods/search/'+searchTerm)
  return data;
}
  // sample_foods.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

export const getAllTags= async ()=> {
  const {data}= await axios.get('/api/foods/tags')
  return data;
}
// sample_tags;

export const getAllByTags= async (tag)=>{
  if(tag === 'All') return getAll()
    const {data}= await axios.get('/api/foods/tags/'+tag)
    return data;
    // return sample_foods.filter(item=> item.tags?.includes(tag))
}
export const getById= async(foodId)=>{
  const {data}= await axios.get('/api/foods/'+foodId)
  return data;
}
  // sample_foods.find(item=> item.id === foodId)
//to get all the foods from data.js