import React, { useState } from 'react';
import './CartPage.css'; // Make sure to import the CSS file

const CartPage = ({ cartItems, onRemove }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

   const handleNameChange = (e) => {
    const input = e.target.value;
    // Allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(input)) {
      setCustomerName(input);
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Allow only digits and max 10 characters
    if (/^\d{0,10}$/.test(input)) {
      setCustomerPhone(input);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!customerName.trim()) {
      alert('Please enter your name.');
      return;
    }

    if (!/^\d{10}$/.test(customerPhone)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // const orderPayload = {
    //   name: customerName,
    //   phone: customerPhone,
    //   cartItems,
    //   total,
    // };

    try {
      // await fetch('http://localhost:5000/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderPayload),
      // });

      let message = `Name: ${customerName}\nMobile: ${customerPhone}\n\nItems:\n`;
      cartItems.forEach(item => {
        message += `${item.name} (x${item.quantity}) — ₹${item.price * item.quantity}\n`;
      });
      message += `\nTotal: ₹${total}\n\nThank you for your order!`;

      const sellerPhoneNumber = '918286083025';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${sellerPhoneNumber}?text=${encodedMessage}`;
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error('Order sending failed:', error);
      alert('Failed to sending order. Please try again.');
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-info">Qty: {item.quantity} × ₹{item.price}</p>
                </div>
                <div className="item-actions">
                  <span className="item-total">₹{item.price * item.quantity}</span>
                  <button onClick={() => onRemove(item.id)} className="remove-button">Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="customer-info">
            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="10-digit Mobile Number"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              className="input-field"
            />
          </div>

          <p className="total-amount">Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>

          <button onClick={handlePlaceOrder} className="place-order-button">
            Place Order via WhatsApp
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;



// import React, { useState } from 'react';

// const CartPage = ({ cartItems, onRemove }) => {
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');

//   const handlePlaceOrder = async () => {
//       if (cartItems.length === 0) {
//         alert('Your cart is empty!');
//         return;
//       }

//       if (!customerName.trim()) {
//         alert('Please enter your name.');
//         return;
//       }

//       if (!/^\d{10}$/.test(customerPhone)) {
//         alert('Please enter a valid 10-digit mobile number.');
//         return;
//       }

//       const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      
//       const orderPayload = {
//         name: customerName,
//         phone: customerPhone,
//         cartItems,
//         total,
//       };

//   try {
//         await fetch('http://localhost:5000/api/orders', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(orderPayload), 
//         });


//       let message = `Name: ${customerName}\n`;
//       message += `Mobile: ${customerPhone}\n\nItems:\n`;

//       cartItems.forEach(item => {
//         message += `${item.name} (x${item.quantity}) — ₹${item.price * item.quantity}\n`;
//       });

//       message += `\nTotal: ₹${total}\n\nThank you for your order!`;

//       const sellerPhoneNumber = '918898884592';
//       const encodedMessage = encodeURIComponent(message);
//       const whatsappUrl = `https://wa.me/${sellerPhoneNumber}?text=${encodedMessage}`;

//       window.location.href = whatsappUrl;
//   } catch (error) {
//       console.error('Order save failed:', error);
//       alert('Failed to save order. Please try again.');
//   }
//   };

//   return (
//     <div className="cart-page" style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id} style={{ marginBottom: '10px' }}>
//                 <strong>{item.name}</strong> — Qty: {item.quantity} — ₹{item.price * item.quantity}
//                 <button
//                   onClick={() => onRemove(item.id)}
//                   style={{
//                     marginLeft: '10px',
//                     background: 'red',
//                     color: 'white',
//                     border: 'none',
//                     padding: '4px 10px',
//                     borderRadius: '4px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div style={{ marginTop: '20px' }}>
//             <label>
//               Name:{' '}
//               <input
//                 type="text"
//                 value={customerName}
//                 onChange={(e) => setCustomerName(e.target.value)}
//                 style={{ padding: '6px', marginBottom: '10px', width: '20%' }}
//               />
//             </label>
//             <br />
//             <label>
//               Mobile Number (10 digits):{' '}
//               <input
//                 type="text"
//                 value={customerPhone}
//                 onChange={(e) => setCustomerPhone(e.target.value)}  
//                 style={{ padding: '6px', width: '20%' }}
//               />
//             </label>
//           </div>

//           <p style={{ marginTop: '20px' }}>
//             <strong>Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong>
//           </p>

//           <button
//             onClick={handlePlaceOrder}
//             style={{
//               marginTop: '15px',
//               padding: '10px 20px',
//               backgroundColor: '#25D366',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               fontSize: '16px',
//               cursor: 'pointer',
//             }}
//           >
//             Place Order via WhatsApp
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;


