import React from "react";
import Carousel from '../../utils/carousel';
import "./home.css"
import { GetProducts } from "../../utils/getProduct";

// import { getProducts } from "../../api/product";

export const Home = () => {
    return (
        <div className="min-h-screen">
            <Carousel/>
           <GetProducts/>
        </div>
    );
};
