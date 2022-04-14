const { getJSONfromFile, getByValue } = require('../lib/utils')

const priceTypeList = getJSONfromFile('CodeLists/priceType.json')

const price = ({
  supplydetail: SupplyDetail
}) => {
  const {
    price: Price
  } = SupplyDetail

  const priceList = []

  for (let i = 0; i < Price.length; i++) {
    const element = Price[i];

    const {
      x462: PriceType,
      j151: PriceAmount,
      j152: CurrencyCode
    } = element

    priceList.push({
      priceTypeCode: PriceType.$t,
      PriceTypeDescription: getByValue(priceTypeList, 'Value', PriceType.$t, 'Description'),
      currencyCode: CurrencyCode.$t,
      priceAmount: PriceAmount.$t
    })
  }

  return priceList
}

module.exports = {
  price
}
