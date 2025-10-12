               
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getProducts } from './api/product';
import { productsDetails } from './api/productsDetails';
import './App.css';
import { ErrorSection } from './common/errorPage';
import { Account } from './features/account/Account';
import { Product } from './features/product/Product';
import Trolley from './features/trolley/Trolley';
import Wishlist from './features/wishlist/Wishlist';
import AddressForm from './forms/AddressForm';
import { EcommerceLayout } from './layouts/EcommerceLayout';
import { About } from './pages/about/About';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import Help from './pages/help/Help';
import { Home } from './pages/home/home';


function App() {
    const router = createBrowserRouter([
        {
            element: <EcommerceLayout />, 
            errorElement: <ErrorSection />, 
            children: [
                {
                    path: '/' ,
                    element: <Home />, 
                    errorElement: <ErrorSection />, 
                    loader: getProducts
                },
                {
                    path: '/product/:productId',
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
                
                },{
                    path: '/auth/login',
                    element: <Login />,
                    errorElement: <ErrorSection />,
                },
                {
                    path: '/auth/register',
                    element: <Register />,
                    errorElement: <ErrorSection />,
                }
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App
