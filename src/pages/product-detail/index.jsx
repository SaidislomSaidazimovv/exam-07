import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const { productName } = useParams();
  const { productDescription } = useParams();
  const { productCost } = useParams();
  const { productColor } = useParams();

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {productId}</p>
      <p>Product Name: {productName}</p>
      <p>Product Description: {productDescription}</p>
      <p>Product Color: {productColor}</p>
      <p>Product Cost: {productCost}</p>
    </div>
  );
};

export default ProductDetail;
