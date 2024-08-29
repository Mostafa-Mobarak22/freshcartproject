import React, { useContext, useState } from 'react'
// import crat from '../../assets/imgs/cart.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { NavLink,Link, useNavigate, useParams } from 'react-router-dom'
// import { LoginToken } from '../logincontext/logincontext'

export default function CheckOut() {
    const {cartid} = useParams()
    const [isLoad , setIsLoad] = useState(false)
    const [errmassg , setErrMassg] = useState("")

    let {handleSubmit,values,handleChange ,errors,touched,handleBlur} = useFormik({
        initialValues:{
            'details':'lnsdkjvkfjv',
            'phone':'010000000',
            'city':'skjfgdvh',
        },
        onSubmit:pay,
        validationSchema:Yup.object({
            details:Yup.string().required("address is required"),
            phone:Yup.string().required("phone is required").matches(/^01[0-2,5]{1}[0-9]{8}$/,"phone number not correct"),
            city:Yup.string().required("city is required"),
        })
    })

    async function pay() {
        try {
            setIsLoad(true);
            setErrMassg("");
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartid,{shippingAddress:values},{
                headers : {
                    token : localStorage.getItem("localToken"),
                },
                params : {
                    url : 'http://localhost:5173'
                }
            });
            location.href = data.session.url
        } catch (err) {
            setErrMassg(err.response.data.message);
        } finally {
            setIsLoad(false);
        }
    }
    return <>
        <section className="bg-gray-50 pt-24">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-3xl text-center mt-3 mb-7 font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                            Check Out
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            
                            <div>
                                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                {touched.details && errors.details && <p className='text-red-500'>{errors.details}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                {touched.phone && errors.phone && <p className='text-red-500'>{errors.phone}</p>}
                            </div>
                            <div>
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                {touched.city && errors.city && <p className='text-red-500'>{errors.city}</p>}
                            </div>
                                <button type="submit" className="w-full text-white bg-purple-900 hover:bg-purple-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-700" disabled={isLoad}>Check Out {isLoad && <i className='ms-2 fas fa-spinner fa-spin'></i>}</button>
                                {errmassg && <p className='text-red-500 text-center'>{errmassg}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}
