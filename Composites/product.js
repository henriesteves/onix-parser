const { contributors } = require('./contributors')
const { price } = require('./price')
const { details } = require('./details')
const { publisher } = require('./publisher')
const { title } = require('./title')

const { getJSONfromFile, getByValue } = require('../lib/utils')

const notificationType = getJSONfromFile('CodeLists/notificationType.json')

const product = ({
  RecordReference,
  NotificationType,
  DescriptiveDetail,
  CollateralDetail,
  PublishingDetail,
  ProductSupply
}) => {
  return {
    ISBN: RecordReference.$t,

    NotificationType: NotificationType.$t,
    Notification: getByValue(notificationType, 'Value', NotificationType.$t, 'Description'),

    title: title(DescriptiveDetail),

    details: details(CollateralDetail),

    publisher: publisher(PublishingDetail),

    contributors: contributors(DescriptiveDetail),

    price: price(ProductSupply)
  }
}

module.exports = {
  product
}
