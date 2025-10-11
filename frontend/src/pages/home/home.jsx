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
            <div className="bg-[#18181b] min-h-screen w-full overflow-x-hidden">
              <div className="pt-3 px-2 sm:px-4 lg:px-6">
                {/* Mobile: Categories first, then Carousel */}
                <div className="block sm:hidden">
                  <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                  <Carousel />
                </div>
                
                {/* Desktop: Carousel first, then Categories */}
                <div className="hidden sm:block">
                  <Carousel />
                  <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                </div>
                
                <GetProducts selectedCategory={selectedCategory} />
              </div>
            </div>
        );
};