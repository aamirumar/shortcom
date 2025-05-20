import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';

const ProductList = ({ products, onCartChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    return (
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
      />
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onCartChange={onCartChange} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
