const { header } = require('./header')
const { product } = require('./product')

const onix = ({ Header, Product }) => {
  if (Array.isArray(Product)) {

    // alguns arquivos onix trazem mais de um produtos, exemplo: print e digital/epub
    // necessário identificar o digital para retornar
    let digitalIndex = 0

    for (let i = 0; i < Product.length; i++) {
      const element = Product[i];

      if (element.DescriptiveDetail.ProductForm === 'EA') { // Digital (delivered electronically)
        digitalIndex = i

        break
      }
    }

    return {
      ...header(Header),
      ...product(Product[digitalIndex])
    }
  }

  return {
    ...header(Header),
    ...product(Product)
  }
}

module.exports = onix
