const { getJSONfromFile, getByValue } = require('../lib/utils')

const CollectionTypeList = getJSONfromFile('CodeLists/collectionType.json')
const TitleTypeList = getJSONfromFile('CodeLists/titleType.json')

const collection = ({
  collection: Collection
}) => {
  if (!Collection) return []

  const collectionList = []

  for (let i = 0; i < Collection.length; i++) {
    const element = Collection[i]

    const {
      x329: CollectionType,
      titledetails: TitleDetails
    } = element

    const titleDetailsList = []

    for (let j = 0; j < TitleDetails.length; j++) {
      const element = TitleDetails[j]

      const {
        x409: TitleElementLevel,
        b203: TitleText
      } = element

      titleDetailsList.push({
        titleElementLevel: TitleElementLevel.$t,
        titleText: TitleText.$t,
        titleDetails: titleDetailsList
      })
    }

    collectionList.push({
      collectionTypeCode: CollectionType.$t,
      collectionTypeDescription: getByValue(CollectionTypeList, 'Value', CollectionType.$t, 'Description'),
    })
  }

  return collectionList
}

module.exports = {
  collection
}
