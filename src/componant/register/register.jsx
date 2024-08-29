import React, { useState } from 'react'
import crat from '../../assets/imgs/cart.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { NavLink,Link, Navigate, useNavigate } from 'react-router-dom'

export default function Register() {

    const [isLoad , setIsLoad] = useState(false)
    const [errmassg , setErrMassg] = useState("")
    const [sucmassg , setSucMassg] = useState("")
    const navigate = useNavigate()

    let {handleSubmit,values,handleChange ,errors,touched,handleBlur} = useFormik({
        initialValues:{
            'name':'mostafa',
            'email':'mostafa@gmail.com',
            'rePassword':'Darsh#darsh800',
            'password':'Darsh#darsh800',
            'phone':'01000000000',
        },
        onSubmit:register,
        validationSchema:Yup.object({
            name:Yup.string().required("Name is required").min(3,"Name must be more than 3 character").max(20,"Name must be less than 20 character"),
            email:Yup.string().required("email is required").email("email not correct"),
            password:Yup.string().required("password is required").matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/,"At least 8 - 16 characters,must contain at least 1 uppercase letter,must contain at least 1 lowercase letter,and 1 number,Can contain any of this special characters $ % # * & - ."),
            rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")],"repassword not matcthed"),
            phone:Yup.string().required("phone is required").matches(/^01[0-2,5]{1}[0-9]{8}$/,"phone number not correct")
        })
    })
    // function validateData(values){
    //     let errors={}
    //     if(values.name==''){
    //         errors.name="Name is required"
    //     }
    //     else if(values.name.length<=3){
    //         errors.name="Name must be more than 3 character"
    //     }
    //     else if(values.name.length>20){
    //         errors.name="Name must be less than 20 character"
    //     }
    //     if(values.password==''){
    //         errors.password="password is required"
    //     }
    //     else if(!(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/.test(values.password))){
    //         errors.password="At least 8 - 16 characters,must contain at least 1 uppercase letter,must contain at least 1 lowercase letter,and 1 number,Can contain any of this special characters $ % # * & - ."
    //     }
    //     if(values.email==''){
    //         errors.email="email is required"
    //     }
    //     else if(!(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(values.email))){
    //         errors.email="email not correct"
    //     }
        
    //     if(values.rePassword==''){
    //         errors.rePassword="repassword is required"
    //     }
    //     else if(values.rePassword!=values.password){
    //         errors.rePassword="repassword not matcthed"
    //     }
    //     if(values.phone==''){
    //         errors.phone="phone is required"
    //     }
    //     else if(!(/^01[0-2,5]{1}[0-9]{8}$/.test(values.phone))){
    //         errors.phone="phone number not correct"
    //     }

    //     // console.log(errors)
    //     return errors

    // }
    async function register(){
        setIsLoad(true)
        setErrMassg("")
        setSucMassg("")
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then((response)=>{
            setSucMassg(`Welcome ${values.name}`)
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }).catch((err)=>{
            setErrMassg(err.response.data.message)
        })
        setIsLoad(false)
        
    }
    return <>
        <section className="bg-gray-50 pt-56">
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Your Name" required=""/>
                                {touched.name && errors.name && <p className='text-red-500'>{errors.name}</p>}
                            </div>
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
                            <div>
                                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" name="rePassword" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                {touched.rePassword && errors.rePassword && <p className='text-red-500'>{errors.rePassword}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                {touched.phone && errors.phone && <p className='text-red-500'>{errors.phone}</p>}
                            </div>
                                <button type="submit" className="w-full text-white bg-purple-900 hover:bg-purple-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-700" disabled={isLoad}>Create an account {isLoad && <i className='ms-2 fas fa-spinner fa-spin'></i>}</button>
                                {sucmassg && <p className='text-green-500 text-center'>{sucmassg}</p>}
                                {errmassg && <p className='text-red-500 text-center'>{errmassg}</p>}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 disabled:bg-gray-700">Login here </Link>
                                </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}
