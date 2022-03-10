const XMLMapping = require('xml-mapping')

const details = ({ TextContent }) => {
  const result = {}

  for (let i = 0; i < TextContent.length; i++) {
    const element = TextContent[i];

    // descrição curta
    if (parseInt(element.TextType.$t, 10) === 2) { // 02 - Short description/annotation
      result.shortDescription = element.Text.$t || handleContent(element.Text)

      continue
    }

    // descrição
    if (parseInt(element.TextType.$t, 10) === 3) { // 03 - Description
      result.description = element.Text.$t || handleContent(element.Text)

      continue
    }

    // tabela de conteudo
    if (parseInt(element.TextType.$t, 10) === 4) { // 04 - Table of contents
      result.toc = element.Text.$t || handleContent(element.Text)

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