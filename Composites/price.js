const { getJSONfromFile, getByValue, formatDate } = require('../lib/utils')

const priceTypeList = getJSONfromFile('CodeLists/priceType.json')
const unpricedItemTypeList = getJSONfromFile('CodeLists/unpricedItemType.json')
const priceDateRoleList = getJSONfromFile('CodeLists/priceDateRole.json')

const price = ({
  supplydetail: SupplyDetail
}) => {
  const {
    price: Price,
    j192: UnpricedItemType
  } = SupplyDetail

  if (!Price) {
    if (UnpricedItemType) {
      return [{
        priceTypeCode: UnpricedItemType.$t,
        priceType: getByValue(unpricedItemTypeList, 'Value', UnpricedItemType.$t, 'Description'),
        currencyCode: 'BRL',
        priceAmount: "0",
        countriesIncluded: [
          "BR"
        ],
        priceDate: []
      }]
    }

    return []
  }

  const priceList = []

  for (let i = 0; i < Price.length; i++) {
    const {
      x462: PriceType,
      j151: PriceAmount,
      j152: CurrencyCode,
      territory: Territory,
      pricedate: PriceDate
    } = Price[i]

    const countriesIncluded = Territory.x449.$t.split(' ')

    if (countriesIncluded.includes('BR')) {
      const priceDateList = []

      if (PriceDate) {
        for (let j = 0; j < PriceDate.length; j++) {
          const {
            x476: PriceDateRole,
            b306: PriceDateValue
          } = PriceDate[j];

          priceDateList.push({
            priceDateRoleCode: PriceDateRole.$t,
            priceDateRole: getByValue(priceDateRoleList, 'Value', PriceDateRole.$t, 'Description'),
            date: formatDate(PriceDateValue.$t)
          })
        }
      }

      priceList.push({
        priceTypeCode: PriceType.$t,
        priceTypeDescription: getByValue(priceTypeList, 'Value', PriceType.$t, 'Description'),
        currencyCode: CurrencyCode.$t,
        priceAmount: PriceAmount.$t,
        countriesIncluded,
        priceDate: priceDateList
      })
    }
  }

  return priceList
}

module.exports = {
  price
}
