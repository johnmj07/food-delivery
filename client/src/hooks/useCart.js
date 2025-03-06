import React, { createContext, useContext, useEffect, useState } from 'react'
// import { sample_foods } from '../data';

const cartContext= createContext(null);
const CART_KEY= 'cart'; //saving to localStorage
const EMPTY_CART= {
  items: [],
  totalPrice: 0,
  totalCount: 0 
}
const CartProvider = ({children}) => {
  const initCart= getCartFromLocalStorage();

  const [cartItems, setCartItems]= useState(
    initCart.items
    // sample_foods.slice(1,4).map(food=> ({
    //   food,
    //   quantity:1,
    //   price: food.price
    // }))
  )
  const [totalPrice, setTotalPrice]= useState(initCart.totalPrice)
  const [totalCount, setTotalCount]= useState(initCart.totalCount)

  const sum= (items)=>{//this items are not cartItems its list of price or quantity
    return items.reduce((prevValue, curValue)=>prevValue+curValue ,0)
  }

  useEffect(()=>{
    const totalPrice=sum(cartItems.map(item=>item.price));
    const totalCount=sum(cartItems.map(item=>item.quantity));
    setTotalPrice(totalPrice)
    setTotalCount(totalCount)

    localStorage.setItem(CART_KEY, JSON.stringify({
      items: cartItems,
      totalPrice,
      totalCount
    }))
  },[cartItems])//whenever any change in cartItems this useEffect will be called

  function getCartFromLocalStorage(){
    const storedCart= localStorage.getItem(CART_KEY);
    return storedCart? JSON.parse(storedCart) : EMPTY_CART
  }

  const removeFromCart=(foodId)=>{
    const filteredItems= cartItems.filter(item=>
      item.food.id !== foodId //return all the items except for the item with the foodId
    )
    setCartItems(filteredItems)
  }

  const changeQuantity=(cartItem, newQuantity)=>{
    const {food}= cartItem;
    const changedCartItem={
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity
    }
    setCartItems(
      cartItems.map(item=>
        item.food.id === food.id? 
        changedCartItem :
        item
      )
    )
  }


 const addToCart=(food)=>{
  const cartItem= cartItems.find(item=> item.food.id === food.id)
  if(cartItem){
    changeQuantity(cartItem, cartItem.quantity+1)
  }else{
    setCartItems([...cartItems, {
      food,
      quantity: 1,
      price: food.price
    }])
  }
 }

  return (
    <cartContext.Provider value={{cart:{
      items: cartItems,
      totalPrice,
      totalCount
    },
    removeFromCart,
    changeQuantity,
    addToCart
  }}>
      {children}
    </cartContext.Provider>
  )
}
export default CartProvider
export const useCart=()=> useContext(cartContext)