const { getJSONfromFile, getByValue } = require('../lib/utils')

const contributorRoleList = getJSONfromFile('CodeLists/contributorRole.json')

const contributors = ({ contributor: Contributor }) => {
  const contributorsList = []

  for (let i = 0; i < Contributor.length; i++) {
    const contributor = Contributor[i];

    const {
      b034: SequenceNumber,
      b035: ContributorRole,
    } = contributor

    contributorsList.push({
      sequence: parseInt(SequenceNumber.$t, 10),
      contributorRoleCode: ContributorRole.$t,
      contributorRole: getByValue(contributorRoleList, 'Value', ContributorRole.$t, 'Description'),
      personName: handleName(contributor)
    })
  }

  return contributorsList
}

const handleName = ({
  b036: PersonName,
  b037: PersonNameInverted,
  b039: NamesBeforeKey,
  b040: KeyNames
}) => {
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
