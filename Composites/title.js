const title = ({ Collection, TitleDetail }) => {
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

  if (parseInt(TitleDetail.TitleType.$t) === 1) {
    return {
      TitleText: handleTitle(TitleDetail.TitleElement),
      Subtitle: handleSubTitle(TitleDetail.TitleElement)
    }
  }
}

const handleTitle = titleElement => {
  let title = ''

  if (titleElement.TitlePrefix) {
    title += titleElement.TitlePrefix.$t + ' '
  }

  if (titleElement.TitleWithoutPrefix) {
    title += titleElement.TitleWithoutPrefix.$t
  }

  if (titleElement.TitleText) {
    title = titleElement.TitleText.$t
  }

  return title.trim()
}

const handleSubTitle = titleElement => {
  let subtitle = ''

  if (titleElement.Subtitle) {
    subtitle = titleElement.Subtitle.$t
  }

  return subtitle.trim()
}

module.exports = {
  title
}