export const getProducts = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
