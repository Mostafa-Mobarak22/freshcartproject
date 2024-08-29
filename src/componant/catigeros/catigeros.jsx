import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Catigeros() {

  const [categorias, setCategorias] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    getCatigeros()
  },[])

  async function getCatigeros(){
      setIsLoading(true)
      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategorias(data.data)
      setIsLoading(false)
  }

  return (

<div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {
        categorias.map((item,index)=>{
          return <Link key={index} to={'/home'} className="group">
          <div className="w-full overflow-hidden rounded-lg bg-gray-200 ">
            <img src={item.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-80 w-full object-cover object-center group-hover:opacity-75"/>
          </div>
          <h3 className="mt-4 text-md font-bold text-gray-700">{item.name}</h3>
        </Link>

        })
      }
    </div>
  </div>
</div>

  )
}
