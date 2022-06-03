const { getJSONfromFile, getByValue, formatDate } = require('../lib/utils')

const PublishingRoleList = getJSONfromFile('CodeLists/publishingRole.json')
const PublishingDateRoleList = getJSONfromFile('CodeLists/publishingDateRole.json')
const PublishingStatusList = getJSONfromFile('CodeLists/publishingStatus.json')
const SalesRightsTypeList = getJSONfromFile('CodeLists/salesRightsType.json')

const publishing = ({
  publisher: Publisher,
  publishingdate: PublishingDate,
  b394: PublishingStatus,
  salesrights: SalesRights
}) => {
  const {
    b291: PublishingRole,
    b081: PublisherName
  } = Publisher

  const {
    b089: SalesRightsType,
    territory: Territory
  } = SalesRights

  const publishingDateList = []

  for (let i = 0; i < PublishingDate.length; i++) {
    const element = PublishingDate[i];

    const {
      x448: PublishingDateRole,
      b306: Date
    } = element

    publishingDateList.push({
      publishingDateRoleCode: PublishingDateRole.$t,
      publishingDateRole: getByValue(PublishingDateRoleList, 'Value', PublishingDateRole.$t, 'Description'),
      publishingDate: formatDate(Date.$t),
    })
  }

  const territoryList = []

  for (let i = 0; i < Territory.length; i++) {
    const element = Territory[i];

    const {
      x449: CountriesIncluded
    } = element

    territoryList.push({
      CountriesIncluded: CountriesIncluded.$t,
    })
  }

  return {
    publishingRoleCode: PublishingRole.$t,
    publishingRole: getByValue(PublishingRoleList, 'Value', PublishingRole.$t, 'Description'),

    publisherName: PublisherName.$t,

    publishingStatusCode: PublishingStatus ? PublishingStatus.$t : '',
    publishingStatus: PublishingStatus ? getByValue(PublishingStatusList, 'Value', PublishingStatus.$t, 'Description') : '',

    publishingDate: publishingDateList,

    salesRightsTypeCode: SalesRightsType.$t,
    salesRightsType: getByValue(SalesRightsTypeList, 'Value', SalesRightsType.$t, 'Description'),

    territory: territoryList
  }
}

module.exports = {
  publishing
}
