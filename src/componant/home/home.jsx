import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Products from '../products/products'
import LoadingScreen from '../loadingscreen/loadingscreen'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
export default function Home() {
 const [products,setProducts]=useState([])
 const [isLoading,setIsLoading] = useState(true)
 const [currentPage, setCurrentPage] = useState(1)
 const [categorias, setCategorias] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  useEffect(()=>{
    getData(currentPage)
    getCatigeros()
  },[currentPage])

  async function getData(currentPage) {
    setIsLoading(true)
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products?page='+currentPage)
    setProducts(data.data)
    setIsLoading(false)
  }

  async function getCatigeros(){
    setIsLoading(true)
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategorias(data.data)
    setIsLoading(false)
}

  return <>
{    isLoading ? <LoadingScreen/>:
      <>
      <div className="w-full flex justify-center overflow-hidden rounded-lg my-8">
        <Slider className='w-1/2'{...settings}>
            {
        categorias.map((item,index)=>{
          return <>
          <img src={item.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-48 group-hover:opacity-75 shadow-xl"/>
              
              <h3 className="mt-4 text-md font-bold text-gray-700">{item.name}</h3>
          </>
          
        })
      }
      </Slider>
      </div>
      <div>
      <label
    class="mx-auto my-12 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
    for="search-bar">
    <input id="search-bar" placeholder="your product here"
        class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"/>
    <button
        class="w-full md:w-auto px-6 py-3 hover:bg-transparent hover:text-gray-800 bg-gray-800 border-gray-800 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
        
        <div class="relative">
            <div
                class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg class="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>

            <div class="flex items-center transition-all opacity-1 valid:"><span
                    class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                </span>
            </div>

        </div>
        
    </button>
</label>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3 gap-5 p-8'>
        {products.map((product,index)=>(
          <Products key={index} product={ product }/>
        ))}
            <div className="xl:col-span-5 lg:col-span-4 md:col-span-3 flex items-center w-full justify-center gap-2 my-5">
              <button onClick={()=>setCurrentPage(1)} className={currentPage==1 ?'bg-gray-950 underline text-white active:bg-purple-600 font-bold uppercase text-lg px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150':'bg-gray-500  text-white active:bg-purple-600 font-bold uppercase text-lg px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'}type="button">
                1
              </button>
              <button onClick={()=>{
                setCurrentPage(2)
                console.log(currentPage)
              }} className={currentPage==2 ?'bg-gray-950 underline text-white active:bg-purple-600 font-bold uppercase text-lg px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150':'bg-gray-500  text-white active:bg-purple-600 font-bold uppercase text-lg px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'} type="button">
                2
              </button>
            </div>
      </div>
      </>
      }
  </>
}
