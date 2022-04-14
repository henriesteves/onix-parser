const fs = require('fs')
const util = require('util')
const XMLMapping = require('xml-mapping')

const content = fs.readFileSync('./files/sampleShort.xml').toString()

const onix = require('./Composites/onix')

var json = XMLMapping.load(content, {
  nested: true,
  arrays: [
  '/ONIXmessage/product',
  '/ONIXmessage/product/collateraldetail/textcontent',
  '/ONIXmessage/product/collateraldetail/supportingresource',
  '/ONIXmessage/product/collateraldetail/supportingresource/resourceversion/resourceversionfeature',
  '/ONIXmessage/product/productsupply/supplydetail/price',
  '/ONIXmessage/product/publishingdetail/publishingdate',
  '/ONIXmessage/product/publishingdetail/salesrights/territory',
  '/ONIXmessage/product/descriptivedetail/extent',
 ]
})
// var xml = XMLMapping.dump(json);

// console.log(json.ONIXmessage)
// console.log(json.ONIXmessage.release)
// console.log(json.ONIXmessage.header)
// console.log(json.ONIXmessage.product)
// console.log(json.ONIXmessage.product.collateraldetail.textcontent)


// console.log(onix(json.ONIXmessage))

console.log(util.inspect(onix(json.ONIXmessage), { showHidden: false, depth: null, colors: true }))
