const { getJSONfromFile, getByValue, normalizeString, normalizeContributerName } = require('../lib/utils')

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

    // this will ignore UnnamedPersons
    if (contributor.b249) {
      continue
    }

    contributorsList.push({
      sequence: parseInt(SequenceNumber.$t, 10),
      contributorRoleCode: ContributorRole.$t,
      contributorRole: getByValue(contributorRoleList, 'Value', ContributorRole.$t, 'Description'),
      personName: normalizeString(normalizeContributerName(handleName(contributor))),
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
  b249: UnnamedPersons,
}) => {


  // Person Name
  if (PersonName) {
    return PersonName.$t
  }

  if (PersonNameInverted) {
    return PersonNameInverted.$t.split(',').reverse().join(' ').trim()
  }

  // Corporate Name
  if (CorporateName) {
    return CorporateName.$t
  }

  if (CorporateNameInverted) {
    return CorporateNameInverted.$t.split(',').reverse().join(' ').trim()
  }

  let name = ''

  // Key name
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
