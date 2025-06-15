function formatAmount(price) {
  price = String(price);

  if (price.length === 4) {
    return price[0] + "," + price.slice(1);
  }

  if (price.length === 5) {
    return price.slice(0, 2) + "," + price.slice(2);
  }

  if (price.length === 6) {
    return price.slice(0, 3) + "," + price.slice(3);
  }

  return price;
}

export default formatAmount;
