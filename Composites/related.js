const { getJSONfromFile, getByValue } = require('../lib/utils')

const ProductRelationList = getJSONfromFile('CodeLists/productRelation.json')
const ProductIdentifierTypeList = getJSONfromFile('CodeLists/productIdentifierType.json')
const ProductFormList = getJSONfromFile('CodeLists/productForm.json')

const related = ({
  relatedproduct: Relatedproduct
}) => {
  if (!Relatedproduct) return []

  const relatedproductList = []

  for (let i = 0; i < Relatedproduct.length; i++) {
    const element = Relatedproduct[i];

    const {
      x455: ProductRelationCode,
      productidentifier: ProductIdentifier,
      b012: ProductForm
    } = element

    const {
      b221: ProductIDType,
      b244: IDValue
    } = ProductIdentifier

    relatedproductList.push({
      productRelationCode: ProductRelationCode.$t,
      productRelation: getByValue(ProductRelationList, 'Value', ProductRelationCode.$t, 'Description'),
      productIDTypeCode: ProductIDType.$t,
      productIDType: getByValue(ProductIdentifierTypeList, 'Value', ProductIDType.$t, 'Description'),
      iDValue: IDValue.$t,
      productFormCode: ProductForm ? ProductForm.$t : '',
      ProductForm: ProductForm ? getByValue(ProductFormList, 'Value', ProductForm.$t, 'Description') : ''
    })
  }

  return relatedproductList
}

module.exports = {
  related
}
