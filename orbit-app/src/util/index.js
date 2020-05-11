export const formatCurrency = num => {
  return `$${num
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};
