import React from 'react';

export default function ProductPrice({ priceString }) {
  // Extract currency symbol (non-digit characters at start) and the numeric part
  const match = priceString.match(/^([^\d]+)([\d,.]+)/);
  
  if (!match) {
    return <span className="product-price">{priceString}</span>;
  }
  
  const currency = match[1];
  const value = match[2];

  return (
    <span className="product-price" aria-label={priceString}>
      <span className="product-price-currency" aria-hidden="true">{currency}</span>
      <span className="product-price-value">{value}</span>
    </span>
  );
}
