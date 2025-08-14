import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {EcommerceLayout} from './components/EcommerceLayout';
import './App.css'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <EcommerceLayout />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App
