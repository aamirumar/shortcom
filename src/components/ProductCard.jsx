// ProductCard.jsx
import React, { useState } from 'react';
// import imageLamb from "../public/Img/Chicken-Liver.png"
// import images from  "../../public/"
const ProductCard = ({ product, onCartChange }) => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(q => q + 1);
    onCartChange(product, 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(q => q - 1);
      onCartChange(product, - 1);
    }
  };

  return (
    <div className="product-card"> 
      <img src={product.image} alt={product.name} />  
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>₹{product.price}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={decrement}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default ProductCard;
