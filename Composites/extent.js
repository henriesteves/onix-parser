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
      extentTypeCode: ExtentType.$t,
      extentType: getByValue(ExtentTypeList, 'Value', ExtentType.$t, 'Description'),
      extentValue: ExtentValue.$t,
      extentUnitCode: ExtentUnit.$t,
      extentUnit: getByValue(ExtentUnitList, 'Value', ExtentUnit.$t, 'Description')
    })
  }

  return extentList
}

module.exports = {
  extent
}
