const { getJSONfromFile, getByValue } = require('../lib/utils')

const ResourceContentTypeList = getJSONfromFile('CodeLists/resourceContentType.json')
const ResourceModeList = getJSONfromFile('CodeLists/resourceMode.json')
const ResourceFormList = getJSONfromFile('CodeLists/resourceForm.json')

const resource = ({
  supportingresource: SupportingResource
}) => {
  if (!SupportingResource) return []

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
      resourceContentTypeCode: ResourceContentType.$t,
      resourceContentType: getByValue(ResourceContentTypeList, 'Value', ResourceContentType.$t, 'Description'),

      resourceModeCode: ResourceMode.$t,
      resourceMode: getByValue(ResourceModeList, 'Value', ResourceMode.$t, 'Description'),

      resourceFormCode: ResourceForm.$t,
      resourceForm: getByValue(ResourceFormList, 'Value', ResourceForm.$t, 'Description'),

      resourceLink: ResourceLink.$t
    })
  }

  return supportingResourceList
}

module.exports = {
  resource
}
