const fs = require('fs')
const XMLMapping = require('xml-mapping')

const { header } = require('./Composites/header')
const { product } = require('./Composites/product')

const onix = onixPath => {
  const onixContent = fs.readFileSync(onixPath).toString()

  const onixJSON = XMLMapping.load(onixContent, {
    nested: true,
    arrays: [
      '/ONIXmessage/product',
      '/ONIXmessage/product/collateraldetail/textcontent',
      '/ONIXmessage/product/collateraldetail/supportingresource',
      '/ONIXmessage/product/collateraldetail/supportingresource/resourceversion/resourceversionfeature',
      '/ONIXmessage/product/contentdetail/contentitem',
      '/ONIXmessage/product/contentdetail/contentitem/supportingresource',
      '/ONIXmessage/product/contentdetail/contentitem/supportingresource/resourcefeature',
      '/ONIXmessage/product/contentdetail/contentitem/supportingresource/resourceversion',
      '/ONIXmessage/product/contentdetail/contentitem/supportingresource/resourceversion/resourceversionfeature',
      '/ONIXmessage/product/descriptivedetail/contributor',
      '/ONIXmessage/product/descriptivedetail/extent',
      '/ONIXmessage/product/descriptivedetail/subject',
      '/ONIXmessage/product/productsupply/supplydetail/price',
      '/ONIXmessage/product/publishingdetail/publishingdate',
      '/ONIXmessage/product/publishingdetail/salesrights/territory',
    ]
  })

  const { release, header: Header, product: Product } = onixJSON.ONIXmessage

  if (!release || release !== '3.0') {
    return {
      status: 'Versão onix incompatível'
    }
  }

  // alguns arquivos onix trazem mais de um produto, exemplo: print e digital/epub
  // necessário identificar o digital para retornar apenas um
  let digitalIndex = 0
  let productForm = ''

  for (let i = 0; i < Product.length; i++) {
    const element = Product[i];

    if (
        element.descriptivedetail.b012 === 'EA' ||  // EA Digital (delivered electronically)
        element.descriptivedetail.b012 === 'ED' ||  // ED Digital download
        element.descriptivedetail.b012 === 'AJ'     // AJ = Downloadable audio file
      ) { // b012 ProductForm
      digitalIndex = i
      productForm = element.descriptivedetail.b012

      break
    }
  }

  return {
    ...header(Header),
    ...product(Product[digitalIndex], productForm || Product[digitalIndex].descriptivedetail.b012),
  }
}

module.exports = onix
