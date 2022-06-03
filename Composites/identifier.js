const { getJSONfromFile, getByValue } = require('../lib/utils')

const ProductIdentifierTypeList = getJSONfromFile('CodeLists/productIdentifierType.json')

const identifier = ProductIdentifier => {
  if (!ProductIdentifier) return []

  const identifierList = []

  for (let i = 0; i < ProductIdentifier.length; i++) {
    const {
      b221: ProductIDType,
      b244: IDValue
    } = ProductIdentifier[i];

    identifierList.push({
      productIDTypeCode: ProductIDType.$t,
      productIDType: getByValue(ProductIdentifierTypeList, 'Value', ProductIDType.$t, 'Description'),
      iDValue: IDValue.$t
    })
  }

  return identifierList
}

module.exports = {
  identifier
}
