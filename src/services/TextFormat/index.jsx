export const thousandFormat = (value) => {
  const currentValue = parseFloat(value).toFixed(0)
  return currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}