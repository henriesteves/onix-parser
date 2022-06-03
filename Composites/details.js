const XMLMapping = require('xml-mapping')

const details = ({
  textcontent: TextContent
}) => {
  const result = {
    shortDescription: '',
    description: '',
    toc: ''
  }

  for (let i = 0; i < TextContent.length; i++) {
    const element = TextContent[i];

    const {
      x426: TextType,
      d104: Text
    } = element

    // descrição curta
    if (parseInt(TextType.$t, 10) === 2) { // 02 - Short description/annotation
      result.shortDescription = Text.$t || handleContent(Text)

      continue
    }

    // descrição
    if (parseInt(TextType.$t, 10) === 3) { // 03 - Description
      result.description = Text.$t || handleContent(Text)

      continue
    }

    // tabela de conteudo
    if (parseInt(TextType.$t, 10) === 4) { // 04 - Table of contents
      result.toc = Text.$t || handleContent(Text)

      continue
    }
  }

  return result
}

const handleContent = content => {
  const keys = Object.keys(content)

  keys.forEach(key => {
    if (key === 'textformat') {
      delete content[key]
    }
  })

  return XMLMapping.dump(content)
}

module.exports = {
  details
}