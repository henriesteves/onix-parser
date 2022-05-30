// const content = fs.readFileSync('./files/bw-epub-2.xml').toString()
// const content = fs.readFileSync('./files/bw-audiobook-1.xml').toString()

const onix = require('./onix')

// var json = XMLMapping.load(content, {
//   nested: true,
//   arrays: [
//   '/ONIXmessage/product',
//   '/ONIXmessage/product/collateraldetail/textcontent',
//   '/ONIXmessage/product/collateraldetail/supportingresource',
//   '/ONIXmessage/product/collateraldetail/supportingresource/resourceversion/resourceversionfeature',
//   '/ONIXmessage/product/contentdetail/contentitem',
//   '/ONIXmessage/product/contentdetail/contentitem/supportingresource',
//   '/ONIXmessage/product/contentdetail/contentitem/supportingresource/resourcefeature',
//   '/ONIXmessage/product/contentdetail/contentitem/supportingresource/resourceversion',
//   '/ONIXmessage/product/contentdetail/contentitem/supportingresource/resourceversion/resourceversionfeature',
//   '/ONIXmessage/product/descriptivedetail/contributor',
//   '/ONIXmessage/product/descriptivedetail/extent',
//   '/ONIXmessage/product/descriptivedetail/subject',
//   '/ONIXmessage/product/productsupply/supplydetail/price',
//   '/ONIXmessage/product/publishingdetail/publishingdate',
//   '/ONIXmessage/product/publishingdetail/salesrights/territory',
//  ]
// })
// var xml = XMLMapping.dump(json);

// console.log(json.ONIXmessage)
// console.log(json.ONIXmessage.release)
// console.log(json.ONIXmessage.header)
// console.log(json.ONIXmessage.product)
// console.log(json.ONIXmessage.product.collateraldetail.textcontent)


// console.log(onix(json.ONIXmessage))

// console.log(util.inspect(onix(json.ONIXmessage), { showHidden: false, depth: null, colors: true }))

// fs.writeFileSync('./final.json', JSON.stringify(onix(json.ONIXmessage), null, 2))

module.exports = onix
