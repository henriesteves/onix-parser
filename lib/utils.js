const fs = require('fs')
const path = require('path')

const getJSONfromFile = relativeFilePath => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', relativeFilePath), { encoding: 'utf-8' }))
}

const getByValue = (arr, key, value, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == value) return arr[i][target]
  }
}

const formatDate = date => {
  const d = date.split('').filter(x => x.match(/\d/)).join('');

  if (d.length >= 14) {
    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${d.slice(8, 10)}:${d.slice(10, 12)}:${d.slice(12, 14)}`
  } else if (d.length === 12) {
    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${d.slice(8, 10)}:${d.slice(10, 12)}`
  } else if (d.length === 8) {
    return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`
  } else if (d.length === 4) {
    return d.slice(0, 4)
  } else {
    return ''
  }
}

const normalizeString = str => {
  return str.normalize('NFC')
}

const tableToJSON = table => {
  const headers = Array.from(table.querySelectorAll('thead tr th')).map(el => el.textContent.trim())
  const result = []
  const rows = Array.from(table.querySelectorAll('tbody tr'))

  rows.forEach(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(el => el.textContent.trim())
    result.push(headers.reduce((rowRes, header, headerIndex) => {
      return {
        ...rowRes,
        [header]: cells[headerIndex]
      };
    }, {}))
  })

  return result
}

module.exports = {
  getJSONfromFile,
  getByValue,
  formatDate,
  normalizeString
}
