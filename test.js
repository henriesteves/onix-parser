const fs = require('fs')
const onix = require('./onix')

!(async () => {
  // console.log(await onix('./files/bw-audiobook-1.xml'))
  // console.log(await onix('./files/bw-epub-1.xml'))
  // console.log(await onix('./files/bw-epub-2.xml'))

  console.log(await onix('./files/bw-teste1.xml'))
  console.log(await onix('./files/bw-teste2.xml'))

  // fs.writeFileSync('./final-audiobook-1.json', JSON.stringify(await onix('./files/bw-audiobook-1.xml'), null, 2))
  // fs.writeFileSync('./final-epub-1.json', JSON.stringify(await onix('./files/bw-epub-1.xml'), null, 2))
  // fs.writeFileSync('./final-epub-2.json', JSON.stringify(await onix('./files/bw-epub-2.xml'), null, 2))

  fs.writeFileSync('./final-teste1.json', JSON.stringify(await onix('./files/bw-teste1.xml'), null, 2))
  fs.writeFileSync('./final-teste2.json', JSON.stringify(await onix('./files/bw-teste2.xml'), null, 2))
})()