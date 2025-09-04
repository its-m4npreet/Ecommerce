import React from "react";
import Carousel from '../../utils/carousel';
import "./home.css"
import { GetProducts } from "../../utils/getProduct";
import { useState } from "react";
import { Categories } from "../../utils/categories";
// import ""

// import { getProducts } from "../../api/product";

export const Home = () => {
      const [selectedCategory, setSelectedCategory] = useState("All");
        return (
            <div className="bg-[#18181b] pt-3">
            <Carousel />
              <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <GetProducts selectedCategory={selectedCategory} />
            </div>
        );
};