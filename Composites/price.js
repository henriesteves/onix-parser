const { getJSONfromFile, getByValue } = require('../lib/utils')

const priceTypeList = getJSONfromFile('CodeLists/priceType.json')
const unpricedItemTypeList = getJSONfromFile('CodeLists/unpricedItemType.json')

const price = ({
  supplydetail: SupplyDetail
}) => {
  const {
    price: Price,
    j192: UnpricedItemType
  } = SupplyDetail

  console.log(UnpricedItemType)

  if (!Price) {
    if (UnpricedItemType) {
      return [{
        priceTypeCode: UnpricedItemType.$t,
        priceType: getByValue(unpricedItemTypeList, 'Value', UnpricedItemType.$t, 'Description'),
        currencyCode: 'BRL',
        priceAmount: "0",
        countriesIncluded: [
          "BR"
        ]
      }]
    }

    return []
  }

  const priceList = []

  for (let i = 0; i < Price.length; i++) {
    const element = Price[i];

    const {
      x462: PriceType,
      j151: PriceAmount,
      j152: CurrencyCode,
      territory: Territory
    } = element

    const countriesIncluded = Territory.x449.$t.split(' ')

    if (countriesIncluded.includes('BR')) {
      priceList.push({
        priceTypeCode: PriceType.$t,
        priceTypeDescription: getByValue(priceTypeList, 'Value', PriceType.$t, 'Description'),
        currencyCode: CurrencyCode.$t,
        priceAmount: PriceAmount.$t,
        countriesIncluded
      })
    }
  }

  return priceList
}

module.exports = {
  price
}
