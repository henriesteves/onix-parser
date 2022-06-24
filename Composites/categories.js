const categories = ({
  subject: Categories
}) => {
  const categoriesList = []

  for (let i = 0; i < Categories.length; i++) {
    const element = Categories[i];

    const {
      x425: MainSubject,
      b067: SubjectSchemeIdentifier,
      b068: SubjectSchemeVersion,
      b069: SubjectCode
    } = element

    if (parseInt(SubjectSchemeIdentifier.$t) === 10 || parseInt(SubjectSchemeIdentifier.$t) === 93) {
      categoriesList.push({
        mainSubject: MainSubject ? true : false,
        subjectSchemeIdentifier: SubjectSchemeIdentifier.$t || '',
        subjectSchemeVersion: SubjectSchemeVersion.$t || '',
        subjectCode: SubjectCode.$t || ''
      })
    }

    // if (parseInt(SubjectSchemeIdentifier.$t) === 93) {
    //   categoriesList.push({
    //     mainSubject: MainSubject ? true : false,
    //     subjectSchemeIdentifier: SubjectSchemeIdentifier.$t || '',
    //     subjectSchemeVersion: SubjectSchemeVersion.$t || '',
    //     subjectCode: SubjectCode.$t || ''
    //   })
    // }
  }

  return categoriesList
}

module.exports = {
  categories
}