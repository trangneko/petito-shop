const CURRENCY_FORMATTER = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
});
export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('vi-VN')
export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
}