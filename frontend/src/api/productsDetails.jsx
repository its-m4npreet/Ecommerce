export async function productsDetails({ params }) {
  const { productId } = params; // <-- must match the route param name!
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
