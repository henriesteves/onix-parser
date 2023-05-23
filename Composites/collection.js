const { getJSONfromFile, getByValue, normalizeString } = require('../lib/utils')

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
      titledetail: TitleDetail
    } = element

    const titleDetailList = []

    for (let j = 0; j < TitleDetail.length; j++) {
      const element = TitleDetail[j]

      const {
        b202: TitleType,
        titleelement: TitleElement
      } = element

      const titleElementList = []

      for (let k = 0; k < TitleElement.length; k++) {
        const element = TitleElement[k]

        const {
          x409: TitleElementLevel,
          x410: PartNumber,
          b034: SequenceNumber,
          b030: TitlePrefix,
          b031: TitleWithoutPrefix,
          b203: TitleText
        } = element

        titleElementList.push({
          sequenceNumber: SequenceNumber ? parseInt(SequenceNumber.$t, 10) : '',
          titleElementLevel: TitleElementLevel ? TitleElementLevel.$t : '',
          partNumber: PartNumber ? PartNumber.$t : '',
          titleText: handleTitle({
            TitlePrefix,
            TitleWithoutPrefix,
            TitleText
          })
        })
      }

      titleDetailList.push({
        titleTypeCode: TitleType.$t,
        titleType: getByValue(TitleTypeList, 'Value', TitleType.$t, 'Description'),
        titleElement: titleElementList
      })
    }

    collectionList.push({
      collectionTypeCode: CollectionType.$t,
      collectionTypeDescription: getByValue(CollectionTypeList, 'Value', CollectionType.$t, 'Description'),
      titleDetail: titleDetailList
    })
  }

  return collectionList
}

const handleTitle = ({ TitlePrefix, TitleWithoutPrefix, TitleText }) => {
  let title = ''

  if (TitlePrefix) {
    title += TitlePrefix.$t + ' '
  }

  if (TitleWithoutPrefix) {
    title += TitleWithoutPrefix.$t
  }

  if (TitleText) {
    title = TitleText.$t
  }

  return normalizeString(title.trim())
}

module.exports = {
  collection
}
