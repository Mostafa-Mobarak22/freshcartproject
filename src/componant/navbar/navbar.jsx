import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginToken } from '../logincontext/logincontext'
import crat from '../../assets/imgs/cart.jpg'
export default function Navbar() {

  const { userToken,setUserToken } = useContext(LoginToken)
  const [isOPen , setIsOpen] = useState(true)
  return (
  <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NavLink to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={crat} className="h-12 rounded-full w-100" alt="FrashCard Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FrashCard</span>
      </NavLink>
      <div className="flex md:order-2">
        <button onClick={()=> setIsOpen(!isOPen)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div className={isOPen ? "ms-32 items-center justify-between hidden w-full md:flex md:w-auto md:order-1": "items-center justify-between w-full md:flex md:w-auto md:order-1"} id="navbar-search">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          
          {
            userToken && <>
            <li>
                <NavLink to={'/home'} className="nav-style">Home</NavLink>
            </li>
            <li>
              <NavLink to={'/cart'} className="nav-style">Cart</NavLink>
            </li>
            <li>
              <NavLink to={'/washlist'} className="nav-style">Wash List</NavLink>
            </li>
            <li>
              <NavLink to={'/catigeros'} className="nav-style">Categories</NavLink>
            </li>
            <li>
              <NavLink to={'/brands'} className="nav-style">Brands</NavLink>
            </li>
            <li className='xl:ps-60'>
              <NavLink to={'/login'} onClick={()=>{
                  localStorage.removeItem('localToken')
                  setUserToken("")
                }} 
                className="nav-style">Logout</NavLink>
            </li>
            <li>
              <NavLink  to={'/cart'} className="nav-style mb-1 text-md font-medium"><i className="fa-solid fa-cart-shopping"></i></NavLink>
            </li> 
            </>
          }
          
            {
              !userToken && <>
              <li>
                <NavLink to={'/register'} className="nav-style">Register</NavLink>
              </li>
              <li>
                <NavLink to={'/login'}  className="nav-style">Login</NavLink>
              </li>
              
              </>
            }
        </ul>
      </div>
    </div>
  </nav>

  )
}
