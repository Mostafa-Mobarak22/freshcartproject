import React, { useContext, useState } from 'react'
import crat from '../../assets/imgs/cart.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { LoginToken } from '../logincontext/logincontext'

export default function Login() {
    
    const [isLoad , setIsLoad] = useState(false)
    const [errmassg , setErrMassg] = useState("")
    const navigate = useNavigate()
    const { userToken,setUserToken } = useContext(LoginToken)
    let {handleSubmit,values,handleChange ,errors,touched,handleBlur} = useFormik({
        initialValues:{
            'email':'mostafa@gmail.com',
            'password':'Darsh#darsh800',
        },
        onSubmit:login,
        validationSchema:Yup.object({
            email:Yup.string().required("email is required").email("email not correct"),
            password:Yup.string().required("password is required").matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/,"At least 8 - 16 characters,must contain at least 1 uppercase letter,must contain at least 1 lowercase letter,and 1 number,Can contain any of this special characters $ % # * & - ."),
            
        })
    })

    async function login() {
        try {
            setIsLoad(true);
            setErrMassg("");
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
            setUserToken(data.token);
            localStorage.setItem("localToken",data.token)
            if(location.pathname=='/login'){
                navigate('/home');
            }else{
                navigate(location.pathname);
            }
            
        } catch (err) {
            setErrMassg(err.response.data.message);
        } finally {
            setIsLoad(false);
        }
    }
    return <>
        <section className="bg-gray-50 pt-24">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img className="w-10 h-10 mr-2 rounded-full" src={crat} alt="logo"/>
                FrashCard    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                {touched.password && errors.password && <p className='text-red-500'>{errors.password}</p>}
                            </div>
                                <button type="submit" className="w-full text-white bg-purple-900 hover:bg-purple-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-700" disabled={isLoad}>Login {isLoad && <i className='ms-2 fas fa-spinner fa-spin'></i>}</button>
                                {errmassg && <p className='text-red-500 text-center'>{errmassg}</p>}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Not have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                                </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}
