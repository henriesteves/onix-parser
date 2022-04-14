const { header } = require('./header')
const { product } = require('./product')

const onix = ({ release, header: Header, product: Product }) => {
  if (!release || release !== '3.0') {
    return {
      status: 'Versão onix incompatível'
    }
  }

  // alguns arquivos onix trazem mais de um produto, exemplo: print e digital/epub
  // necessário identificar o digital para retornar apenas um
  let digitalIndex = 0

  for (let i = 0; i < Product.length; i++) {
    const element = Product[i];

    // EA Digital (delivered electronically)
    // ED Digital download
    if (element.descriptivedetail.b012 === 'EA' || element.descriptivedetail.b012 === 'ED') { // b012 ProductForm
      digitalIndex = i

      break
    }
  }

  return {
    ...header(Header),
    ...product(Product[digitalIndex])
  }
}

module.exports = onix
