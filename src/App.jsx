import './App.css'
import Register from './componant/register/register'
import Login from './componant/login/login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './componant/home/home'
import Cart from './componant/cart/cart'
import Products from './componant/products/products'
import Catigeros from './componant/catigeros/catigeros'
import Brands from './componant/brands/brands'
import Washlist from './componant/washlist/washlist'
import Logincontext from './componant/logincontext/logincontext'
import Protected from './componant/protected/protected'
import SignProtected from './componant/protect sign/signprotected'
import NotFound from './componant/notfound/notfound'
import Layout from './componant/layout/layout'
import ProductDetails from './componant/product details/productdetails'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import CheckOut from './checkout/checkout'
function App() {
  const router = createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<Protected><Home /></Protected>},
      {path:'home',element:<Protected><Home /></Protected>},
      {path:'login',element:<SignProtected><Login /></SignProtected>},
      {path:'register',element:<SignProtected><Register /></SignProtected>},
      {path:'cart',element:<Protected><Cart /></Protected>},
      {path:'products',element:<Protected><Products /></Protected>},
      {path:'catigeros',element:<Protected><Catigeros /></Protected>},
      {path:'brands',element:<Protected><Brands /></Protected>},
      {path:'washlist',element:<Protected><Washlist /></Protected>},
      {path:'checkout/:cartid',element:<Protected><CheckOut /></Protected>},
      {path:'productdetails/:id',element:<Protected><ProductDetails/></Protected>},
    ]},
    {path:'*',element:<NotFound/>},
  ])
  return <>
        <Logincontext>
          <RouterProvider router={router} />
          <ToastContainer />
        </Logincontext>
    </>
}
export default App
