import axios from "axios";
import { Bounce, toast } from "react-toastify";
export async function updateCountProduct(productId,newCount){
    let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,
        {count: newCount},
        {headers:{token:localStorage.getItem("localToken")}}
    )
    
    toast.success(data.message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
  }