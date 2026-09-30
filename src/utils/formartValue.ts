export default function formatValue(value: number) {
  const price = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
  return price;
}
