const { getJSONfromFile, getByValue } = require('../lib/utils')

const priceTypeList = getJSONfromFile('CodeLists/priceType.json')

const price = ({ SupplyDetail }) => {
  const priceList = []

  if (Array.isArray(SupplyDetail.Price)) {
    for (let i = 0; i < SupplyDetail.Price.length; i++) {
      const element = SupplyDetail.Price[i];

      priceList.push({
        priceType: element.PriceType.$t,
        PriceTypeDescription: getByValue(priceTypeList, 'Value', element.PriceType.$t, 'Description'),
        currencyCode: element.CurrencyCode.$t,
        priceAmount: element.PriceAmount.$t
      })
    }

    return priceList
  }

  priceList.push({
    priceType: SupplyDetail.Price.PriceType.$t,
    PriceTypeDescription: getByValue(priceTypeList, 'Value', SupplyDetail.Price.PriceType.$t, 'Description'),
    currencyCode: SupplyDetail.Price.CurrencyCode.$t,
    priceAmount: SupplyDetail.Price.PriceAmount.$t
  })

  return priceList
}

module.exports = {
  price
}
