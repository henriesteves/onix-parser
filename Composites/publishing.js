const { getJSONfromFile, getByValue, formatDate, normalizeString } = require('../lib/utils')

const PublishingRoleList = getJSONfromFile('CodeLists/publishingRole.json')
const PublishingDateRoleList = getJSONfromFile('CodeLists/publishingDateRole.json')
const PublishingStatusList = getJSONfromFile('CodeLists/publishingStatus.json')
const SalesRightsTypeList = getJSONfromFile('CodeLists/salesRightsType.json')
const SalesRestrictionTypeList = getJSONfromFile('CodeLists/salesRestrictionType.json')

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

  // PublisherDate
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

  // SalesRights
  const salesRightsList = []

  if (SalesRights && SalesRights.length > 0) {
    for (let i = 0; i < SalesRights.length; i++) {
      const element = SalesRights[i];

      const {
        b089: SalesRightsType,
        territory: Territory,
        salesrestriction: SalesRestriction
      } = element

      // Territory
      const territoryList = []

      if (Territory && Territory.length > 0) {
        for (let j = 0; j < Territory.length; j++) {
          const element = Territory[j];

          const {
            x449: CountriesIncluded,
            x450: RegionsIncluded,
            x451: CountriesExcluded,
            x452: RegionsExcluded
          } = element

          if (
            (CountriesIncluded && CountriesIncluded.$t === 'BR') ||
            (RegionsIncluded && RegionsIncluded.$t === 'WORLD')
          ) {
            territoryList.push({
              CountriesIncluded: CountriesIncluded ? CountriesIncluded.$t : '',
              RegionsIncluded: RegionsIncluded ? RegionsIncluded.$t : '',
              CountriesExcluded: CountriesExcluded ? CountriesExcluded.$t : '',
              RegionsExcluded: RegionsExcluded ? RegionsExcluded.$t : ''
            })
          }
        }
      }

      if (territoryList.length === 0) continue

      // SalesRestriction
      const SalesRestrictionList = []

      if (SalesRestriction && SalesRestriction.length > 0) {
        for (let j = 0; j < SalesRestriction.length; j++) {
          const element = SalesRestriction[j];

          const {
            b381: SalesRestrictionType,
            x453: SalesRestrictionNote
          } = element

          SalesRestrictionList.push({
            salesRestrictionTypeCode: SalesRestrictionType.$t,
            salesRestrictionType: getByValue(SalesRestrictionTypeList, 'Value', SalesRestrictionType.$t, 'Description'),
            salesRestrictionNote: SalesRestrictionNote ? SalesRestrictionNote.$t : ''
          })
        }
      }

      salesRightsList.push({
        salesRightsTypeCode: SalesRightsType.$t,
        salesRightsType: getByValue(SalesRightsTypeList, 'Value', SalesRightsType.$t, 'Description'),
        territory: territoryList,
        salesRestriction: SalesRestrictionList
      })
    }
  }



  return {
    publishingRoleCode: PublishingRole.$t,
    publishingRole: getByValue(PublishingRoleList, 'Value', PublishingRole.$t, 'Description'),

    publisherName: normalizeString(PublisherName.$t),

    publishingStatusCode: PublishingStatus ? PublishingStatus.$t : '',
    publishingStatus: PublishingStatus ? getByValue(PublishingStatusList, 'Value', PublishingStatus.$t, 'Description') : '',

    publishingDate: publishingDateList,

    salesRights: salesRightsList
  }
}

module.exports = {
  publishing
}
