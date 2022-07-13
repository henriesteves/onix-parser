const { getJSONfromFile, getByValue } = require('../lib/utils')

const resourceFormList = getJSONfromFile('CodeLists/resourceForm.json')
const resourceModeList = getJSONfromFile('CodeLists/resourceMode.json')
const resourceFeatureTypeList = getJSONfromFile('CodeLists/resourceFeatureType.json')

const chapters = ({ contentitem: Contentitem }) => {
  if (!Contentitem) return []

  const chaptersList = []

  for (let i = 0; i < Contentitem.length; i++) {
    const chapter = Contentitem[i];

    const {
      b288: ComponentTypeName,
      b289: ComponentNumber,
      supportingresource: Supportingresource
    } = chapter

    let resourceFeatureTypeCode = ''
    let resourceFeatureType = ''
    let featureValue = ''

    let resourceFormCode = ''
    let resourceForm = ''
    let resourceLink = ''

    if (Supportingresource) {
      for (let j = 0; j < Supportingresource.length; j++) {
        const supportingresource = Supportingresource[j]

        const {
          resourcefeature: Resourcefeature,
          resourceversion: Resourceversion
        } = supportingresource

        for (let k = 0; k < Resourcefeature.length; k++) {
          const resourcefeature = Resourcefeature[k]

          const {
            x438: ResourceFeatureType,
            x439: FeatureValue
          } = resourcefeature

          resourceFeatureTypeCode = ResourceFeatureType.$t
          resourceFeatureType = getByValue(resourceFeatureTypeList, 'Value', ResourceFeatureType.$t, 'Description')
          featureValue = FeatureValue.$t
        }

        for (let l = 0; l < Resourceversion.length; l++) {
          const resourceversion = Resourceversion[l]

          const {
            x441: ResourceForm,
            x435: ResourceLink
          } = resourceversion

          resourceFormCode = ResourceForm.$t
          resourceForm = getByValue(resourceFormList, 'Value', ResourceForm.$t, 'Description')
          resourceLink = ResourceLink.$t
        }
      }
    }

    chaptersList.push({
      index: ComponentNumber.$t,
      title: ComponentTypeName.$t,

      resourceFeatureTypeCode,
      resourceFeatureType,
      featureValue,

      resourceFormCode,
      resourceForm,
      resourceLink
    })
  }

  return chaptersList
}

module.exports = {
  chapters
}
