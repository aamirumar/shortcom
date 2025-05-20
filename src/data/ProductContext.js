//     import React, { createContext, useState } from 'react';
//     import productsData from './products';

//     export const ProductContext = createContext();

//     export const ProductProvider = ({ children }) => {
//     const [products, setProducts] = useState(productsData);
//     const [cartItems, setCartItems] = useState([]);

//     const generateId = () => {
//         return Math.max(0, ...products.map(p => p.id || 0)) + 1;
//     };

//     const addProduct = (product) => {
//         const newProduct = { ...product, id: generateId() };
//         setProducts(prev => [...prev, newProduct]);
//     };

//     const updateProduct = (updatedProduct) => {
//         setProducts(prev =>
//         prev.map(product =>
//             product.id === updatedProduct.id ? updatedProduct : product
//         )
//         );
//     };

//     const deleteProduct = (productId) => {
//         setProducts(prev => prev.filter(product => product.id !== productId));
//     };

//     const addToCart = (product, quantity = 1) => {
//         setCartItems(prevCart => {
//         const existing = prevCart.find(item => item.id === product.id);
//         if (existing) {
//             return prevCart.map(item =>
//             item.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             );
//         } else {
//             return [...prevCart, { ...product, quantity }];
//         }
//         });
//     };

//     const removeFromCart = (productId) => {
//         setCartItems(prev => prev.filter(item => item.id !== productId));
//     };

//     return (
//         <ProductContext.Provider value={{
//         products,
//         cartItems,
//         addProduct,
//         updateProduct,
//         deleteProduct,
//         addToCart,
//         removeFromCart
//         }}>
//         {children}
//         </ProductContext.Provider>
//     );
// };


import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Load from backend
  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  const addProduct = async (product) => {
    const res = await axios.post('http://localhost:5000/products', product);
    setProducts(prev => [...prev, res.data]);
  };

  const updateProduct = async (product) => {
    await axios.put(`http://localhost:5000/products/${product.id}`, product);
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? product : p))
    );
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
