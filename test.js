const fs = require('fs')
const onix = require('./onix')

!(async () => {
  console.log(await onix('./files/bw-audiobook-1.xml'))
  // console.log(await onix('./files/bw-epub-1.xml'))
  // console.log(awiat onix('./files/bw-epub-2.xml'))

  fs.writeFileSync('./final.json', JSON.stringify(await onix('./files/bw-audiobook-1.xml'), null, 2))
})()