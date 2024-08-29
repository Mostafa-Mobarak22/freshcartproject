import axios from 'axios'
import React, { useState } from 'react'
import Products from '../products/products'
import { useEffect } from 'react'
import LoadingScreen from '../loadingscreen/loadingscreen'
import { Link } from 'react-router-dom'
import { removeFromWish } from '../../removefromwish'
import { addToCart } from '../../addtocart'
export default function Washlist() {
  const [isLoading,setIsLoading] = useState(true)
  const [products,setProducts] = useState(null)

  useEffect(() =>{
    getWishlistProduct()
  },[products])

  async function getWishlistProduct(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers:{token:localStorage.getItem("localToken")}
      }
    )
    setProducts(data)
    setIsLoading(false)
  }
  
  function rating(rating){
    let stars = []
    if((rating-Math.trunc(rating))===0){
      for(let i=1;i<=rating;i++){
        stars.push(i)
      }
      return <>
        {
          stars.map((index)=>{
            return<i key={index} className="fa-solid fa-star me-1"></i>
          })
        }
      </>
    }else{
      let newRtaing = Math.trunc(rating)
      for(let i=1;i<=newRtaing+1;i++){
        stars.push(i)
    }
    return <>
        {
          stars.map((star,index)=>{
            if(star===newRtaing+1){
              return <i key={index} className="fa-regular fa-star-half-stroke me-1"></i>
            }
            else{
              return<i key={index} className="fa-solid fa-star me-2"></i>
            }
          })
        }
      </>
  }}
  return (<>
  {    isLoading ? <LoadingScreen/>:
        <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3 gap-5 p-8'>
          {products?.data.map((product,index)=>{
            console.log(product._id)
            return <div key={index} className="max-w-sm bg-gray-700 border border-gray-200 rounded-lg shadow">
            <Link to={'/productdetails/'+product?._id}>
              <img className=" hover:rounded-lg w-full hover:scale-125 transition duration-150" src={product?.imageCover} alt="product image" />
            </Link>
          <div className="px-5 py-5 ">
              <Link to={'/productdetails/'+product?._id}>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1"title={product?.title}>{product?.title}</h2>
              </Link>
              <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 ">
                      <span className='me-2 text-yellow-300'>{rating(product?.ratingsAverage)}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.ratingsAverage}</span>
              </div>
              <div className="flex flex-col items-center justify-between">
                  <span className="text-2xl  font-bold text-gray-900 dark:text-white mb-3">${product?.price}</span>
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={()=>{removeFromWish(product?._id)}}  className="bg-gray-500 text-gray-950 hover:text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                      <i className="fas fa-heart text-lg"></i>
                    </button>
                    <button onClick={()=>{addToCart(product?._id)}}  className="bg-gray-500 hover:text-gray-950 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    <i className="fa-solid fa-cart-plus text-lg"></i>
                    </button>
                  </div>
              </div>
          </div>
      </div>  
        })
        }
        </div>}
    </>)
}
