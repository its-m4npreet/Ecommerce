import { useState } from "react";
import { Categories } from "../../utils/categories";
import { GetProducts } from "../../utils/getProduct";
// import "../../components/shop.css"

export const Shop = () => {
     const [selectedCategory, setSelectedCategory] = useState("All");
    return (
        <>
          <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <GetProducts selectedCategory={selectedCategory} />
        </>
    );
};
   
 