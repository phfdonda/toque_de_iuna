const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "BRL",
    style: "currency"
})

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("pt-br")

export function formatNumber(amount: number) {
    return NUMBER_FORMATTER.format(amount)
}