const { getJSONfromFile, getByValue } = require('../lib/utils')

const ProductFormDetailList = getJSONfromFile('CodeLists/productFormDetail.json')

const formDetail = (ProductFormDetail) => {
  // A103 >	MP3 format
  // E101	> EPUB
  // E201 > Fixed format
  const productFormDetailCode = ProductFormDetail.filter(e => e.$t === 'A103' || e.$t === 'E101')[0].$t

  return {
    code: productFormDetailCode,
    detail: getByValue(ProductFormDetailList, 'Value', productFormDetailCode, 'Description'),
    isFixedFormat: ProductFormDetail.some(e => e.$t === 'E201')
  }
}

module.exports = {
  formDetail
}
