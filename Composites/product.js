const { contributors } = require('./contributors')
const { price } = require('./price')
const { details } = require('./details')
const { publishing } = require('./publishing')
const { title } = require('./title')
const { identifier } = require('./identifier')
const { resource } = require('./resource')
const { extent } = require('./extent')
const { keywords } = require('./keywords')
const { chapters } = require('./chapters')
const { categories } = require('./categories')
const { formDetail } = require('./formDetail')
const { related } = require('./related')
const { collection } = require('./collection')

const { getJSONfromFile, getByValue } = require('../lib/utils')

const NotificationTypeList = getJSONfromFile('CodeLists/notificationType.json')
const EPublicationTechnicalProtectionList = getJSONfromFile('CodeLists/ePublicationTechnicalProtection.json')
const ProductContentTypeList = getJSONfromFile('CodeLists/productContentType.json')
const ProductFormDetailList = getJSONfromFile('CodeLists/productFormDetail.json')

const product = ({
  a001: RecordReference,
  a002: NotificationType,
  descriptivedetail: DescriptiveDetail,
  collateraldetail: CollateralDetail,
  contentdetail: Contentdetail,
  publishingdetail: PublishingDetail,
  productsupply: ProductSupply,
  productidentifier: ProductIdentifier,
  relatedmaterial: RelatedMaterial,
}) => {
  const {
    b333: ProductFormDetail,
    x416: PrimaryContentType,
    x317: EpubTechnicalProtection
  } = DescriptiveDetail

  return {
    recordReference: RecordReference.$t,

    notificationType: NotificationType.$t,
    notification: getByValue(NotificationTypeList, 'Value', NotificationType.$t, 'Description'),


    productFormDetail: formDetail(ProductFormDetail),

    // productForm: ProductFormDetail.$t,
    // productFormDetailCode: ProductFormDetail.$t,
    // productFormDetail: getByValue(ProductFormDetailList, 'Value', ProductFormDetail.$t, 'Description'),

    primaryContentTypeCode: PrimaryContentType.$t,
    primaryContentType: getByValue(ProductContentTypeList, 'Value', PrimaryContentType.$t, 'Description'),

    epubTechnicalProtectionCode: EpubTechnicalProtection.$t,
    epubTechnicalProtection: getByValue(EPublicationTechnicalProtectionList, 'Value', EpubTechnicalProtection.$t, 'Description'),

    identifiers: identifier(ProductIdentifier),

    iSNB13: identifier(ProductIdentifier).filter(identifier => identifier.productIDTypeCode === '15')[0].iDValue,

    title: title(DescriptiveDetail),

    details: details(CollateralDetail),

    publishing: publishing(PublishingDetail),

    contributors: contributors(DescriptiveDetail),

    price: price(ProductSupply),

    priceBRL: price(ProductSupply).filter(price => price.currencyCode === 'BRL')[0].priceAmount,

    resources: resource(CollateralDetail),

    extent: extent(DescriptiveDetail),

    keywords: keywords(DescriptiveDetail),

    chapters: chapters(Contentdetail || []),

    categories: categories(DescriptiveDetail),

    // related: related(RelatedMaterial),

    // collection: collection(DescriptiveDetail)
  }
}

module.exports = {
  product
}
