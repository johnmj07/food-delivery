import React, { useEffect, useState } from 'react'
import classes from './foodPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getById } from '../../services/foodService'
import StarRating from '../../components/StarRating/StarRating'
import Tags from '../../components/Tags/Tags'
import Price from '../../components/Price/Price'
import { useCart } from '../../hooks/useCart'
import NotFound from '../../components/NotFound/NotFound'

const FoodPage = () => {
  const [food, setFood]= useState({})
  const {addToCart}= useCart();
  const navigate= useNavigate()
  const {id}= useParams();//get id route parameter from AppRoutes

  const handleAddToCart=()=>{
    addToCart(food);
    navigate('/cart');
  }

  useEffect(()=>{
    getById(id).then(setFood)
  },[id])//load the food by the above id just lik homePage
  return (
    <>
      {//if food is available && then show the details
        // food && 
        !food ? (<NotFound message='Food Not Found!' linkText='Back To HomePage'/>):(
        <div className={classes.container}>
          <img 
            className={classes.image} 
            src={`${food.imageUrl}`} 
            alt={food.name} 
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>
                {food.name}
              </span>
              <span className={`${classes.favourite} ${food.favourite? '' : classes.not}`}>
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating 
                stars={food.stars}
                size={25}
              />
            </div>
            <div className={classes.origins}>
              {
                food.origins?.map(origin=>
                  <span key={origin}>
                    {origin}
                  </span>
                )
              }
            </div>
            <div className={classes.tags}>
              {food.tags && 
                <Tags 
                  tags={food.tags.map(tag=>({name:tag}))}
                  forFoodPage={true}
                />
              }
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes.
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price}/>
            </div>
            <button
              onClick={handleAddToCart}
            >Add To Cart</button>
          </div> 
        </div>
        )
      }
    </>
  )
}// this is for tags {if food.tags have value then(&&) show the Tags component convert each tags into an object of name:tag}

export default FoodPage