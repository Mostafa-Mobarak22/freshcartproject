import axios from "axios";
import { Bounce, toast } from "react-toastify";
export async function removeFromWish(productId){
    let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/"+productId,
      {headers:{token:localStorage.getItem("localToken")}}
    )
    console.log(data)
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