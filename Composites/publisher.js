const { getJSONfromFile, getByValue, formatDate } = require('../lib/utils')

const PublishingRole = getJSONfromFile('CodeLists/publishingRole.json')
const PublishingDateRole = getJSONfromFile('CodeLists/publishingDateRole.json')

const publisher = ({ Publisher, PublishingDate }) => {
  let publishingDate = ''
  let publishingDateRole = ''

  if (Array.isArray(PublishingDate)) {
    for (let i = 0; i < PublishingDate.length; i++) {
      const element = PublishingDate[i];

      if (parseInt(element.PublishingDateRole.$t) === 01) { // Publication date
        publishingDate = formatDate(element.Date.$t)
        publishingDateRole = element.PublishingDateRole.$t

        break
      }
    }
  } else {
    publishingDate = formatDate(PublishingDate.Date.$t)
    publishingDateRole = PublishingDate.PublishingDateRole.$t
  }

  return {
    PublishingRoleCode: Publisher.PublishingRole.$t,
    PublishingRole: getByValue(PublishingRole, 'Value', Publisher.PublishingRole.$t, 'Description'),
    PublisherName: Publisher.PublisherName.$t,
    PublishingDateRoleCode: publishingDateRole,
    PublishingDateRole: getByValue(PublishingDateRole, 'Value', publishingDateRole, 'Description'),
    PublishingDate: publishingDate
  }
}

module.exports = {
  publisher
}
