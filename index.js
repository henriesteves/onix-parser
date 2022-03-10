const fs = require('fs')
const XMLMapping = require('xml-mapping')

const content = fs.readFileSync('./files/sample2.xml').toString()

const onix = require('./Composites/onix')

var json = XMLMapping.load(content, { nested: true })
// var xml = XMLMapping.dump(json);

console.log(onix(json.ONIXMessage))
