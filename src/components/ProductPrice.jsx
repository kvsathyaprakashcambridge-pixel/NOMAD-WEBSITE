import React from 'react';

export default function ProductPrice({ priceString }) {
  // If a raw number is passed, format it as a string with commas
  const stringVal = typeof priceString === 'number' 
    ? `₹${priceString.toLocaleString('en-IN')}` 
    : String(priceString);

  // Extract currency symbol (non-digit characters at start) and the numeric part
  const match = stringVal.match(/^([^\d]+)([\d,.]+)/);
  
  if (!match) {
    return <span className="product-price">{stringVal}</span>;
  }
  
  const currency = match[1];
  const value = match[2];

  return (
    <span className="product-price" aria-label={stringVal}>
      <span className="product-price-currency" aria-hidden="true" style={{ verticalAlign: '-1px', display: 'inline-block' }}>{currency}</span>
      <span className="product-price-value">{value}</span>
    </span>
  );
}
