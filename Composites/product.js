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
}) => {
  const {
    b333: ProductFormDetail,
    x416: PrimaryContentType,
    x317: EpubTechnicalProtection
  } = DescriptiveDetail

  return {
    RecordReference: RecordReference.$t,

    NotificationType: NotificationType.$t,
    Notification: getByValue(NotificationTypeList, 'Value', NotificationType.$t, 'Description'),

    ProductFormDetailCode: ProductFormDetail.$t,
    ProductFormDetail: getByValue(ProductFormDetailList, 'Value', ProductFormDetail.$t, 'Description'),

    PrimaryContentTypeCode: PrimaryContentType.$t,
    PrimaryContentType: getByValue(ProductContentTypeList, 'Value', PrimaryContentType.$t, 'Description'),

    EpubTechnicalProtectionCode: EpubTechnicalProtection.$t,
    EpubTechnicalProtection: getByValue(EPublicationTechnicalProtectionList, 'Value', EpubTechnicalProtection.$t, 'Description'),

    identifiers: identifier(ProductIdentifier),

    title: title(DescriptiveDetail),

    details: details(CollateralDetail),

    publishing: publishing(PublishingDetail),

    contributors: contributors(DescriptiveDetail),

    price: price(ProductSupply),

    resources: resource(CollateralDetail),

    extent: extent(DescriptiveDetail),

    keywords: keywords(DescriptiveDetail),

    chapters: chapters(Contentdetail || [])
  }
}

module.exports = {
  product
}
