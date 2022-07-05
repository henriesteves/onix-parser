const { getJSONfromFile, getByValue } = require('../lib/utils')

const audienceRangeQualifierList = getJSONfromFile('CodeLists/audienceRangeQualifier.json')
const audienceRangePrecisionList = getJSONfromFile('CodeLists/audienceRangePrecision.json')

const audienceRange = ({
  audiencerange: AudienceRange
}) => {
  if (!AudienceRange) return []

  const audienceRangeList = []

  for (let i = 0; i < AudienceRange.length; i++) {
    const element = AudienceRange[i];

    const {
      b074: AudienceRangeQualifierCode,
      b075: AudienceRangePrecision,
      b076: AudienceRangeValue
    } = element

    let exact = ''
    let from = ''
    let to = ''

    if (AudienceRangeQualifierCode.$t === '17') {
      for (let j = 0; j < AudienceRangePrecision.length; j++) {
        if (exact === '' && AudienceRangePrecision[j].$t === '01') {
          exact = AudienceRangeValue[j].$t || ''

          continue
        }

        if (from === '' && AudienceRangePrecision[j].$t === '03') {
          from = AudienceRangeValue[j].$t || ''

          continue
        }

        if (to === '' && AudienceRangePrecision[j].$t === '04') {
          to = AudienceRangeValue[j].$t || ''

          continue
        }
      }

      audienceRangeList.push({
        audienceRangeQualifierCode: AudienceRangeQualifierCode.$t,
        audienceRangeQualifier: getByValue(audienceRangeQualifierList, 'Value', AudienceRangeQualifierCode.$t, 'Description'),
        exact,
        from,
        to
      })
    }

    // if (AudienceRangeQualifierCode.$t === '31') {
    //   audienceRangeList.push({
    //     audienceRangeQualifierCode: AudienceRangeQualifierCode.$t,
    //   })
    // }
  }

  return audienceRangeList
}

module.exports = {
  audienceRange
}
