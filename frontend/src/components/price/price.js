import React from 'react'

export default function Price({price, locale = 'vi-VN', currency = 'VND'}) {

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price.includes('đ') ? price : `${price}đ`;
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }) 
    .format(price)
    .replace('₫', 'đ');
  }
  return <span>{formatPrice(price)}</span>;
}