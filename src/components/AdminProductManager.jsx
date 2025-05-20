
// import React, { useContext, useState } from 'react';
// import { ProductContext } from '../data/ProductContext';
// import './AdminProductManager.css';

// const AdminProductManager = () => {
//   const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
//   const [form, setForm] = useState({ id: null, name: '', price: '', image: '', description: '' });
//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     isEditing ? updateProduct(form) : addProduct(form);
//     setForm({ id: null, name: '', price: '', image: '', description: '' });
//     setIsEditing(false);
//   };

//   const handleEdit = (product) => {
//     setForm(product);
//     setIsEditing(true);
//   };

//   const handleDelete = (productId) => {
//     deleteProduct(productId);
//   };

//   return (
//     <div className="admin-container p-6">
//       <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">🛠️ Admin Product Manager</h2>

//       <form onSubmit={handleSubmit} className="admin-form bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-10 space-y-4">
//         <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
//         <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
//         <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
//         <textarea name="description" placeholder="Product Description" value={form.description} onChange={handleChange} required />
//         <button type="submit" className={isEditing ? 'btn-edit' : 'btn-add'}>
//           {isEditing ? 'Update Product' : 'Add Product'}
//         </button>
//       </form>

//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.name} className="product-image" />
//             <h3>{product.name}</h3>
//             <p className="description">{product.description}</p>
//             <p className="price">₹{product.price}</p>
//             <div className="card-buttons">
//               <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
//               <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminProductManager;



import React, { useContext, useState } from 'react';
import { ProductContext } from '../data/ProductContext';
import './AdminProductManager.css';

const AdminProductManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [form, setForm] = useState({ id: null, name: '', price: '', image: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateProduct(form) : addProduct(form);
    setForm({ id: null, name: '', price: '', image: '', description: '' });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  return (
    <div className="admin-container p-6">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">🛠️ Admin Product Manager</h2>

      <form onSubmit={handleSubmit} className="admin-form bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-10 space-y-4">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" value={form.description} onChange={handleChange} required />
        <button type="submit" className={isEditing ? 'btn-edit' : 'btn-add'}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">₹{product.price}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductManager;
