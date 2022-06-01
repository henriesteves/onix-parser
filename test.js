const onix = require('./onix')

!(async () => {
  console.log(await onix('./files/bw-audiobook-1.xml'))
  // console.log(await onix('./files/bw-epub-1.xml'))
  // console.log(awiat onix('./files/bw-epub-2.xml'))
})()