import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../loadingscreen/loadingscreen'
import { addToCart } from '../../addtocart'
import { addToWishList } from '../../addtowishlist'

export default function ProductDetails() {
    let { id } = useParams()
    const [isLoading,setIsLoading] = useState(true)
    let [productDetails,setProductDetails] = useState(null)

    async function getProductDetails(){
        try {
            setIsLoading(true);
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id);
            setProductDetails(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }
    useEffect(()=>{
        getProductDetails()
    },[])

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

    function slider(index){
        console.log(index)
        const src = document.getElementById('parent').getAttribute('src');
        const newSrc = document.getElementsByClassName('child')[index].getAttribute('src')
        document.getElementById('parent').setAttribute('src', newSrc);
        document.getElementsByClassName('child').setAttribute('src', src);
    }
  return <>
  {

    isLoading ? <LoadingScreen/> :
    <div className="font-sans my-8 py-5">
        <div className="p-4 max-w-6xl max-md:max-w-xl mx-auto">
            <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">

                <div className="w-full lg:sticky top-0 flex gap-3">
                    <img id='parent' src={productDetails?.images[0]}alt="Product" className="hover:scale-125 transition duration-150 w-3/4 rounded-lg object-cover shadow-xl" />

                    <div className="w-20 flex flex-col max-sm:mb-4 gap-3">
                        {
                            productDetails?.images.map((img,index)=>{
                                return <img onClick={()=>{slider(index)}} key={index} src={img} alt="Product" className="child shadow-xl w-full hover:rounded-lg hover:scale-150 transition duration-150 rounded-lg object-cover" />
                            })
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-gray-800">{productDetails?.title}</h2>
                    <p className="text-sm text-gray-600 mt-8">{productDetails?.category.name + " >> " + productDetails?.subcategory[0].name}</p>
                    <h3 className="text-lg text-gray-800 my-8 font-bold ">{productDetails?.brand.name}</h3>
                    <div className="flex items-center space-x-1 ">
                        <span className='me-2 text-gray-800'>{rating(productDetails?.ratingsAverage)}</span>
                        <span className="ms-2 text-gray-800">{productDetails?.ratingsAverage + "/" + productDetails?.ratingsQuantity}</span>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-gray-800 text-4xl max-sm:text-3xl font-bold">${productDetails?.price}</h3>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <button onClick={()=>addToCart(productDetails._id)} type="button" className="flex items-center justify-center px-8 py-4 text-white  bg-gray-800 hover:bg-white hover:text-gray-800 border border-gray-800 text-base rounded-lg transition duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-current inline mr-3" viewBox="0 0 512 512">
                                <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" data-original="#000000"></path>
                            </svg>
                            Add to cart
                        </button>

                        <button onClick={()=>addToWishList(productDetails._id)} type="button" className="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-gray-800 text-gray-800 hover:text-white border border-gray-800 text-base rounded-lg transition duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer fill-current inline mr-3" viewBox="0 0 64 64">
                                <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                            </svg>
                            Add to wishlist
                        </button>
                    </div>

                    <ul className="grid grid-cols-2 mt-10">
                        <li className="text-gray-800 font-semibold text-base text-center py-3 border-b-2 px-4 cursor-pointer">
                            Description
                        </li>
                    </ul>

                    <ul className="space-y-3 list-disc pl-4 text-sm text-gray-600 mt-8">
                        <li>{productDetails?.description}</li>

                    </ul>

                </div>
            </div>
        </div>
    </div>
  }
    
  
  </>
}
