const VND_CURRENCY_FORMATTER = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});

const JPY_CURRENCY_FORMATTER = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

export function formatCurrency(
  amount: number,
  currency: "VND" | "JPY" = "VND"
) {
  const formatter =
    currency === "VND" ? VND_CURRENCY_FORMATTER : JPY_CURRENCY_FORMATTER;
  return formatter.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("vi-VN");
export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}
