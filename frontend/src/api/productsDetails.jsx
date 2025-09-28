export async function productsDetails({ params }) {
  const { productId } = params; // <-- must match the route param name!
  console.log(productId);
  const res = await fetch(`http://localhost:8080/api/products/${productId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  console.log(data);
  return data;
}
