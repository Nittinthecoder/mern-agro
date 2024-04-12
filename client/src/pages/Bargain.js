import React, { useState } from 'react';

const Bargain = () => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');

  const handleBargain = async () => {
    try {
      // Make a request to the backend to negotiate the price
      const response = await fetch('/api/bargain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, price }),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        // Do something with the negotiated price
        console.log('Negotiated price:', data.negotiatedPrice);
      } else {
        console.error('Failed to negotiate price');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Bargain Page</h1>
      <input
        type="text"
        placeholder="Product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleBargain}>Bargain</button>
    </div>
  );
};

export default Bargain;



