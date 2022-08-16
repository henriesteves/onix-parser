const { normalizeString } = require('../lib/utils.js')

const keywords = ({
  subject: Keywords
}) => {
  const keywordsList = []

  for (let i = 0; i < Keywords.length; i++) {
    const element = Keywords[i];

    const {
      b067: SubjectSchemeIdentifier,
      b070: SubjectHeadingText
    } = element

    if (parseInt(SubjectSchemeIdentifier.$t) === 20) {
      keywordsList.push(normalizeString(SubjectHeadingText.$t) || '')
    }
  }

  return keywordsList
}

module.exports = {
  keywords
}
