import { categories } from "../api/categories";

export const Categories = ({ selectedCategory, setSelectedCategory }) => {
    return (
            <div className="categories flex ">
                {categories.map((category) => (
                    <div
                        className={`category ${selectedCategory === category.title ? "bg-blue-600 text-white" : ""}`}
                        key={category.id}
                        onClick={() => setSelectedCategory(category.title)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={category.img} alt={category.title} className="w-full h-32 object-cover" />
                        <h3>{category.title}</h3>
                    </div>
                ))}
            </div>
        );
};
