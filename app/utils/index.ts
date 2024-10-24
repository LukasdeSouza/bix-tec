export function formatCurrency(value: number, currency?: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency?.toUpperCase() || "BRL",
  }).format(value);
}
