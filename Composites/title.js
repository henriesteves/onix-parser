const { normalizeString } =  require('../lib/utils.js')

const title = ({
  Collection,
  titledetail: TitleDetail
}) => {
  if (Collection || Array.isArray(TitleDetail)) {

    for (let i = 0; i < TitleDetail.length; i++) {
      const element = TitleDetail[i];

      if (parseInt(element.TitleType.$t) === 1) {
        return {
          TitleText: handleTitle(element.TitleElement),
          Subtitle: handleSubTitle(element.TitleElement)
        }
      }
    }
  }

  const {
    b202: TitleType,
    titleelement: TitleElement
  } = TitleDetail

  if (parseInt(TitleType.$t) === 1) {
    return {
      titleText: handleTitle(TitleElement),
      subtitle: handleSubTitle(TitleElement)
    }
  }
}

const handleTitle = titleElement => {
  const {
    b203: TitlePrefix,
    b031: TitleWithoutPrefix,
    b203: TitleText
  } = titleElement

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

const handleSubTitle = titleElement => {
  const { b029: Subtitle } = titleElement

  let subtitle = ''

  if (Subtitle) {
    subtitle = Subtitle.$t
  }

  return normalizeString(subtitle.trim())
}

module.exports = {
  title
}