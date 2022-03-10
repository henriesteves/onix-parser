const { getJSONfromFile, getByValue } = require('../lib/utils')

const contributorRoleList = getJSONfromFile('CodeLists/contributorRole.json')

const contributors = ({ Contributor }) => {
  const contributorsList = []

  if (Array.isArray(Contributor)) {
    for (let i = 0; i < Contributor.length; i++) {
      const contributor = Contributor[i];

      contributorsList.push({
        sequence: parseInt(contributor.SequenceNumber.$t, 10),
        contributorRoleCode: contributor.ContributorRole.$t,
        contributorRole: getByValue(contributorRoleList, 'Value', contributor.ContributorRole.$t, 'Description'),
        personName: handleName(contributor)
      })
    }

    return contributorsList
  }

  contributorsList.push({
    sequence: parseInt(Contributor.SequenceNumber.$t, 10),
    contributorRoleCode: Contributor.ContributorRole.$t,
    contributorRole: getByValue(contributorRoleList, 'Value', Contributor.ContributorRole.$t, 'Description'),
    personName: handleName(Contributor)
  })

  return contributorsList
}

const handleName = ({ PersonName, PersonNameInverted, NamesBeforeKey, KeyNames }) => {
  let name = ''

  if (PersonName) {
    name = PersonName.$t
  }

  if (PersonNameInverted) {
    name = PersonNameInverted.$t.split(',').reverse().join(' ').trim()
  }

  if (NamesBeforeKey) {
    name = NamesBeforeKey.$t + ' '
  }

  if (KeyNames) {
    name += KeyNames.$t + ' '
  }

  return name
}

module.exports = {
  contributors
}
