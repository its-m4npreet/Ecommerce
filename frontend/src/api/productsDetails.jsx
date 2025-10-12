export async function productsDetails({ params }) {
  const { productId } = params; // <-- must match the route param name!
  console.log(productId);
  const res = await fetch(`https://ecommerce-agqj.onrender.com/api/products/${productId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  console.log(data);
  return data;
}
