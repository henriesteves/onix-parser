const { getJSONfromFile, getByValue } = require('../lib/utils')

const ExtentTypeList = getJSONfromFile('CodeLists/extentType.json')
const ExtentUnitList = getJSONfromFile('CodeLists/extentUnit.json')

const extent = ({
  extent: Extent
}) => {
  const extentList = []

  for (let i = 0; i < Extent.length; i++) {
    const element = Extent[i];

    const {
      b218: ExtentType,
      b219: ExtentValue,
      b220: ExtentUnit
    } = element

    extentList.push({
      ExtentTypeCode: ExtentType.$t,
      ExtentType: getByValue(ExtentTypeList, 'Value', ExtentType.$t, 'Description'),
      ExtentValue: ExtentValue.$t,
      ExtentUnitCode: ExtentUnit.$t,
      ExtentUnit: getByValue(ExtentUnitList, 'Value', ExtentUnit.$t, 'Description')
    })
  }

  return extentList
}

module.exports = {
  extent
}
