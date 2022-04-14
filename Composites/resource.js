const { getJSONfromFile, getByValue } = require('../lib/utils')

const ResourceContentTypeList = getJSONfromFile('CodeLists/resourceContentType.json')
const ResourceModeList = getJSONfromFile('CodeLists/resourceMode.json')
const ResourceFormList = getJSONfromFile('CodeLists/resourceForm.json')

const resource = ({
  supportingresource: SupportingResource
}) => {
  const supportingResourceList = []

  for (let i = 0; i < SupportingResource.length; i++) {
    const element = SupportingResource[i];

    const {
      x436: ResourceContentType,
      x437: ResourceMode,
      resourceversion: ResourceVersion
    } = element

    const {
      x441: ResourceForm,
      x435: ResourceLink
    } = ResourceVersion

    supportingResourceList.push({
      ResourceContentTypeCode: ResourceContentType.$t,
      ResourceContentType: getByValue(ResourceContentTypeList, 'Value', ResourceContentType.$t, 'Description'),

      ResourceModeCode: ResourceMode.$t,
      ResourceMode: getByValue(ResourceModeList, 'Value', ResourceMode.$t, 'Description'),

      ResourceFormCode: ResourceForm.$t,
      ResourceForm: getByValue(ResourceFormList, 'Value', ResourceForm.$t, 'Description'),

      ResourceLink: ResourceLink.$t
    })
  }

  return supportingResourceList
}

module.exports = {
  resource
}
