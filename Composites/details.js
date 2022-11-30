const XMLMapping = require('xml-mapping')

const { normalizeString } = require('../lib/utils')

const details = ({
  textcontent: TextContent,
}, onixContentRaw) => {
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
      result.shortDescription = normalizeString(Text.$t || handleXHTML(Text, '02', onixContentRaw) || handleContent(Text))

      continue
    }

    // descrição
    if (parseInt(TextType.$t, 10) === 3) { // 03 - Description
      result.description = normalizeString(Text.$t || handleXHTML(Text, '03', onixContentRaw) || handleContent(Text))

      continue
    }

    // tabela de conteudo
    if (parseInt(TextType.$t, 10) === 4) { // 04 - Table of contents
      result.toc = normalizeString(Text.$t || handleXHTML(Text, '04', onixContentRaw) || handleContent(Text))

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

// função para tratar o conteúdo XHTML - textformat = 05
const handleXHTML = (text, textType, onixContentRaw) => {
  let textFromXHML = ''

  if (text.refname === 'Text' && text.textformat === '05') { // 05 - XHTML
    for (let j = 0; j < Object.keys(text).length; j++) {
      const textKey = Object.keys(text)[j]

      if (textKey !== 'refname' && textKey !== 'textformat') {
        const textContentArray = onixContentRaw.match(/<textcontent>[\s\S]*?<\/textcontent>/g)

        if (textContentArray && textContentArray.length > 0) {
          textContentArray.forEach(textContent => {
            if (textContent.includes(`<x426 refname="TextType">${textType}</x426>`)) { // 02 - 03 - 04
              const textTag = textContent.match(/<d104 refname="Text" textformat="05">[\s\S]*?<\/d104>/g)

              if (textTag && textTag.length > 0) {
                const textContent = textTag[0].replaceAll('<d104 refname="Text" textformat="05">', '').replaceAll('</d104>', '')

                textFromXHML = textContent.replace(/\s+/g, ' ').replace(/'/g, "''").trim();
              }
            }
          })
        }

        break
      }
    }
  }

  return textFromXHML
}

module.exports = {
  details
}



// List 153: Text type
// 01	Sender - defined text	To be used only in circumstances where the parties to an exchange have agreed to include text which(a) is not for general distribution, and(b) cannot be coded elsewhere.If more than one type of text is sent, it must be identified by tagging within the text itself
// 02	Short description / annotation	Limited to a maximum of 350 characters
// 03	Description	Length unrestricted
// 04	Table of contents	Used for a table of contents sent as a single text field, which may or may not carry structure expressed as XHTML
// 05	Flap / cover copy	Descriptive blurb taken from the back cover and / or flaps
// 06	Review quote	A quote taken from a review of the product or of the work in question where there is no need to take account of different editions
// 07	Review quote: previous edition	A quote taken from a review of a previous edition of the work
// 08	Review quote: previous work	A quote taken from a review of a previous work by the same author(s) or in the same series
// 09	Endorsement	A quote usually provided by a celebrity or another author to promote a new book, not from a review
// 10	Promotional headline	A promotional phrase which is intended to headline a description of the product
// 11	Feature	Text describing a feature of a product to which the publisher wishes to draw attention for promotional purposes.Each separate feature should be described by a separate repeat, so that formatting can be applied at the discretion of the receiver of the ONIX record, or multiple features can be described using appropriate XHTML markup
// 12	Biographical note	A note referring to all contributors to a product – NOT linked to a single contributor
// 13	Publisher’s notice	A statement included by a publisher in fulfillment of contractual obligations, such as a disclaimer, sponsor statement, or legal notice of any sort.Note that the inclusion of such a notice cannot and does not imply that a user of the ONIX record is obliged to reproduce it
// 14	Excerpt	A short excerpt from the work
// 15	Index	Used for an index sent as a single text field, which may be structured using XHTML
// 16	Short description / annotation for collection(of which the product is a part.) Limited to a maximum of 350 characters
// 17	Description for collection(of which the product is a part.) Length unrestricted
// 18	New feature	As code 11 but used for a new feature of this edition or version
// 19	Version history
// 20	Open access statement	Short summary statement of open access status and any related conditions(eg ‘Open access – no commercial use’), primarily for marketing purposes.Should always be accompanied by a link to the complete license(see < EpubLicense > or code 99 in List 158)
// 21	Digital exclusivity statement	Short summary statement that the product is available only in digital formats(eg ‘Digital exclusive’).If a non - digital version is planned, <ContentDate> should be used to specify the date when exclusivity will end (use content date role code 15). If a non-digital version is available, the statement should not be included
// 22	Official recommendation	For example a recommendation or approval provided by a ministry of education or other official body. Use <Text> to provide details and ideally use <TextSourceCorporate> to name the approver



// List 34: Text format code
// 00	ASCII text	DEPRECATED: use code 06 or 07 as appropriate
// 01	SGML
// 02	HTML	Other than XHTML
// 03	XML	Other than XHTML
// 04	PDF	DEPRECATED: was formerly assigned both to PDF and to XHTML
// 05	XHTML
// 06	Default text format	Default: text in the encoding declared at the head of the message or in the XML default (UTF - 8 or UTF - 16) if there is no explicit declaration
// 07	Basic ASCII text	Plain text containing no tags of any kind, except for the tags & amp; and & lt; that XML insists must be used to represent ampersand and less - than characters in text; and with the character set limited to the ASCII range, i.e.valid UTF - 8 characters whose character number lies between 32(space) and 126(tilde)
// 08	PDF	Replaces 04 for the < TextFormat > element, but cannot of course be used as a textformat attribute
// 09	Microsoft rich text format(RTF)
// 10	Microsoft Word binary format(DOC)
// 11	ECMA 376 WordprocessingML	Office Open XML file format / OOXML / DOCX
// 12	ISO 26300 ODF	ISO Open Document Format
// 13	Corel Wordperfect binary format(DOC)
// 14	EPUB	The Open Publication Structure / OPS Container Format standard of the International Digital Publishing Forum(IDPF)[File extension.epub]
// 15	XPS	XML Paper Specification