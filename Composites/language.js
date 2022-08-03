const { getJSONfromFile, getByValue } = require('../lib/utils')

const languageRoleList = getJSONfromFile('CodeLists/languageRole.json')
const languageCodeList = getJSONfromFile('CodeLists/languageCode.json')

const language = ({
  language: Language
}) => {
  if (!Language) return []

  const languageList = []

  for (let i = 0; i < Language.length; i++) {
    const element = Language[i];

    const LanguageRole = element.b253.$t
    const LanguageCode = element.b252.$t

    languageList.push({
      languageRoleCode: LanguageRole,
      languageRole: getByValue(languageRoleList, 'Value', LanguageRole, 'Description'),
      languageCodeCode: LanguageCode,
      language: getByValue(languageCodeList, 'Value', LanguageCode, 'Description')
    })
  }

  return languageList
}

module.exports = {
  language
}
