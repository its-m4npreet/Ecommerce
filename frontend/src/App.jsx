               
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {EcommerceLayout} from './layouts/EcommerceLayout';
import './App.css'
import { Home } from './pages/home/home';
import { getProducts } from './api/product';
import  {ErrorSection}  from './common/ErrorPage';
import { Shop } from './features/shop/Shop';
import { Product } from './features/product/Product';
import { About } from './pages/about/About';
import { Account } from './features/account/Account';
import Wishlist from './features/wishlist/Wishlist';
import Trolley from './features/trolley/Trolley';
import { productsDetails } from './api/productsDetails';
import Help from './pages/help/Help';
import AddressForm from './forms/AddressForm';


function App() {
    const router = createBrowserRouter([
        {
            element: <EcommerceLayout />, 
            errorElement: <ErrorSection />, 
            children: [
                {
                    path: '/home',
                    element: <Home />, 
                    loader: getProducts,
                    errorElement: <ErrorSection />, 
                },
                {
                    path: '/shop',
                    element: <Shop />, 
                    errorElement: <ErrorSection />, 
                    loader: getProducts
                },
                {
                    path: '/shop/:productId',
                    element: <Product />, 
                    errorElement: <ErrorSection />, 
                    loader: productsDetails,
                },
                {
                    path: '/about',
                    element: <About />, 
                    errorElement: <ErrorSection />, 
                },
                {
                    path: '/help',
                    element: <Help />, 
                    errorElement: <ErrorSection />, 
                },
                {
                    path: '/account',
                    element: <Account />, 
                    errorElement: <ErrorSection />, 
                },
                {
                    path: '/wishlist',
                    element: <Wishlist />, 
                    errorElement: <ErrorSection />, 
                },
                {
                    path: '/trolley',
                    element: <Trolley />,
                    errorElement: <ErrorSection />, 
                
                },
                {
                    path: '/trolley/:addressForm',
                    element: <AddressForm />,
                    errorElement: <ErrorSection />, 
                
                }
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App
