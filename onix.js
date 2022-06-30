const fs = require('fs')
const XMLMapping = require('xml-mapping')

const { header } = require('./Composites/header')
const { product } = require('./Composites/product')

const onix = onixPath => {
  return new Promise((resolve, reject) => {
    const onixContent = fs.readFileSync(onixPath).toString()

    if (!onixContent) {
      reject(new Error('No onix content'))
    }

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
        '/ONIXmessage/product/descriptivedetail/collection',
        '/ONIXmessage/product/descriptivedetail/collection/titledetail/titleelement',
        '/ONIXmessage/product/descriptivedetail/extent',
        '/ONIXmessage/product/descriptivedetail/subject',
        '/ONIXmessage/product/descriptivedetail/b333', // ProductFormDetail
        '/ONIXmessage/product/productidentifier',
        '/ONIXmessage/product/productsupply/supplydetail/price',
        '/ONIXmessage/product/publishingdetail/publishingdate',
        '/ONIXmessage/product/publishingdetail/salesrights',
        '/ONIXmessage/product/publishingdetail/salesrights/territory',
        '/ONIXmessage/product/publishingdetail/salesrights/salesrestriction',
        '/ONIXmessage/product/relatedmaterial/relatedproduct',
      ]
    })

    const { release, header: Header, product: Product } = onixJSON.ONIXmessage

    if (!release || release !== '3.0') {
      resolve({
        status: false,
        message: ['Invalid ONIX version']
      })
    }

    // alguns arquivos onix trazem mais de um produto, exemplo: print e digital/epub
    // necessário identificar o digital para retornar apenas um
    let digitalIndex = 0
    let productForm = ''

    for (let i = 0; i < Product.length; i++) {
      const element = Product[i];

      if (
        element.descriptivedetail.b012.$t === 'EA' ||  // EA Digital (delivered electronically)
        element.descriptivedetail.b012.$t === 'ED' ||  // ED Digital download
        element.descriptivedetail.b012.$t === 'AJ'     // AJ = Downloadable audio file
      ) { // b012 ProductForm
        digitalIndex = i
        productForm = element.descriptivedetail.b012.$t

        break
      }
    }

    if (productForm !== 'EA' && productForm !== 'ED' && productForm !== 'AJ') {
      resolve({
        status: false,
        message: ['ProductForm unknown']
      })
    }

    for (let i = 0; i < Product[digitalIndex].descriptivedetail.b333.length; i++) {
      const element = Product[digitalIndex].descriptivedetail.b333[i];

      if (element.$t !== 'E201' && element.$t !== 'E101') {
        resolve({
          status: false,
          message: ['ProductFormDetail unknown']
        })
      }
    }

    const productJSON = {
      ...header(Header),
      ...product(Product[digitalIndex])
    }

    const errors = []

    if (!productJSON.identifiers || productJSON.identifiers.length === 0) {
      errors.push('No identifier found')
    }

    if (productJSON.identifiers && productJSON.identifiers.length >= 1) {
      if (productJSON.identifiers.filter(identifier => identifier.productIDTypeCode === '15').length === 0) {
        errors.push('No ISBN-13 identifier found')
      }
    }

    if (!productJSON.title || !productJSON.title.titleText || productJSON.title.titleText === '') {
      errors.push('No title found')
    }

    if (!productJSON.details || !productJSON.details.description || productJSON.details.description === '') {
      errors.push('No de found')
    }

    if (!productJSON.contributors || productJSON.contributors.length === 0) {
      errors.push('No contributor found')
    }

    if (!productJSON.price || productJSON.price.length === 0) {
      errors.push('No price found')
    }

    if (productJSON.price && productJSON.price.length >= 1) {
      if (productJSON.price.filter(price => price.currencyCode === 'BRL').length === 0) {
        errors.push('No BRL price found')
      }
    }

    if (!productJSON.resources || productJSON.resources.length === 0) {
      // errors.push('No resource found')
    }

    // audiobook
    if (productForm === 'AJ') {
      if (!productJSON.chapters || productJSON.chapters.length === 0) {
        errors.push('No chapter found')
      }
    }

    if (errors.length > 0) {
      resolve({
        status: false,
        message: errors
      })
    }

    resolve({
      status: true,
      data: productJSON
    })
  })
}

module.exports = onix
