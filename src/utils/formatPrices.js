export const formatPrices = (price) => {
    let PriceToNumber = Number(price);
    return Intl.NumberFormat('es-CO', {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    }).format(PriceToNumber);
}