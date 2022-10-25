const { getJSONfromFile, getByValue, normalizeString } = require('../lib/utils')

const contributorRoleList = getJSONfromFile('CodeLists/contributorRole.json')

const contributors = ({ contributor: Contributor }) => {
  if (!Contributor) return []

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
  b040: KeyNames,
  b047: CorporateName,
  x443: CorporateNameInverted,
}) => {
  let name = ''

  // Person Name
  if (PersonName) {
    name = PersonName.$t

    return normalizeString(name)
  }

  if (PersonNameInverted) {
    name = PersonNameInverted.$t.split(',').reverse().join(' ').trim()

    return normalizeString(name)
  }

  // Corporate Name
  if (CorporateName) {
    name = CorporateName.$t

    return normalizeString(name)
  }

  if (CorporateNameInverted) {
    name = CorporateNameInverted.$t.split(',').reverse().join(' ').trim()

    return normalizeString(name)
  }

  // Key name
  if (NamesBeforeKey) {
    name = NamesBeforeKey.$t + ' '
  }

  if (KeyNames) {
    name += KeyNames.$t + ' '
  }

  return normalizeString(name)
}

module.exports = {
  contributors
}
