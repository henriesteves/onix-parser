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

const normalizeAllUnicodeText = text => {
  if (!text) return ''

  // First normalize combining characters
  let result = text.normalize('NFD');

  // Use regex to handle all mathematical alphabet variants at once
  result = result.replace(/[\u{1D400}-\u{1D7FF}]/gu, (match) => {
    const code = match.codePointAt(0);

    // Mathematical alphabets start at 0x1D400
    // Each alphabet block has 52 characters (26 uppercase + 26 lowercase)
    // But some have gaps, so we need to handle them individually

    // Mathematical Bold (0x1D400-0x1D433)
    if (code >= 0x1D400 && code <= 0x1D419) return String.fromCharCode(code - 0x1D400 + 0x41); // A-Z
    if (code >= 0x1D41A && code <= 0x1D433) return String.fromCharCode(code - 0x1D41A + 0x61); // a-z

    // Mathematical Italic (0x1D434-0x1D467)
    if (code >= 0x1D434 && code <= 0x1D44D) return String.fromCharCode(code - 0x1D434 + 0x41); // A-Z
    if (code >= 0x1D44E && code <= 0x1D467) return String.fromCharCode(code - 0x1D44E + 0x61); // a-z

    // Mathematical Bold Italic (0x1D468-0x1D49B)
    if (code >= 0x1D468 && code <= 0x1D481) return String.fromCharCode(code - 0x1D468 + 0x41); // A-Z
    if (code >= 0x1D482 && code <= 0x1D49B) return String.fromCharCode(code - 0x1D482 + 0x61); // a-z

    // Mathematical Script (0x1D49C-0x1D4CF)
    if (code >= 0x1D49C && code <= 0x1D4B5) return String.fromCharCode(code - 0x1D49C + 0x41); // A-Z
    if (code >= 0x1D4B6 && code <= 0x1D4CF) return String.fromCharCode(code - 0x1D4B6 + 0x61); // a-z

    // Mathematical Bold Script (0x1D4D0-0x1D503)
    if (code >= 0x1D4D0 && code <= 0x1D4E9) return String.fromCharCode(code - 0x1D4D0 + 0x41); // A-Z
    if (code >= 0x1D4EA && code <= 0x1D503) return String.fromCharCode(code - 0x1D4EA + 0x61); // a-z

    // Mathematical Fraktur (0x1D504-0x1D537)
    if (code >= 0x1D504 && code <= 0x1D51D) return String.fromCharCode(code - 0x1D504 + 0x41); // A-Z
    if (code >= 0x1D51E && code <= 0x1D537) return String.fromCharCode(code - 0x1D51E + 0x61); // a-z

    // Mathematical Double-struck (0x1D538-0x1D56B)
    if (code >= 0x1D538 && code <= 0x1D551) return String.fromCharCode(code - 0x1D538 + 0x41); // A-Z
    if (code >= 0x1D552 && code <= 0x1D56B) return String.fromCharCode(code - 0x1D552 + 0x61); // a-z

    // Mathematical Bold Fraktur (0x1D56C-0x1D59F)
    if (code >= 0x1D56C && code <= 0x1D585) return String.fromCharCode(code - 0x1D56C + 0x41); // A-Z
    if (code >= 0x1D586 && code <= 0x1D59F) return String.fromCharCode(code - 0x1D586 + 0x61); // a-z

    // Mathematical Sans-serif (0x1D5A0-0x1D5D3)
    if (code >= 0x1D5A0 && code <= 0x1D5B9) return String.fromCharCode(code - 0x1D5A0 + 0x41); // A-Z
    if (code >= 0x1D5BA && code <= 0x1D5D3) return String.fromCharCode(code - 0x1D5BA + 0x61); // a-z

    // Mathematical Sans-serif Bold (0x1D5D4-0x1D607)
    if (code >= 0x1D5D4 && code <= 0x1D5ED) return String.fromCharCode(code - 0x1D5D4 + 0x41); // A-Z
    if (code >= 0x1D5EE && code <= 0x1D607) return String.fromCharCode(code - 0x1D5EE + 0x61); // a-z

    // Mathematical Sans-serif Italic (0x1D608-0x1D63B)
    if (code >= 0x1D608 && code <= 0x1D621) return String.fromCharCode(code - 0x1D608 + 0x41); // A-Z
    if (code >= 0x1D622 && code <= 0x1D63B) return String.fromCharCode(code - 0x1D622 + 0x61); // a-z

    // Mathematical Sans-serif Bold Italic (0x1D63C-0x1D66F)
    if (code >= 0x1D63C && code <= 0x1D655) return String.fromCharCode(code - 0x1D63C + 0x41); // A-Z
    if (code >= 0x1D656 && code <= 0x1D66F) return String.fromCharCode(code - 0x1D656 + 0x61); // a-z

    // Mathematical Monospace (0x1D670-0x1D6A3)
    if (code >= 0x1D670 && code <= 0x1D689) return String.fromCharCode(code - 0x1D670 + 0x41); // A-Z
    if (code >= 0x1D68A && code <= 0x1D6A3) return String.fromCharCode(code - 0x1D68A + 0x61); // a-z

    return match; // Return unchanged if not in handled ranges
  });

  // Handle special characters that don't follow the pattern
  const specialChars = {
    'ℂ': 'C', 'ℍ': 'H', 'ℕ': 'N', 'ℙ': 'P', 'ℚ': 'Q', 'ℝ': 'R', 'ℤ': 'Z',
    'ℬ': 'B', 'ℰ': 'E', 'ℱ': 'F', 'ℳ': 'M', 'ℛ': 'R', 'ℯ': 'e', 'ℊ': 'g',
    'ℋ': 'H', 'ℐ': 'I', 'ℒ': 'L', 'ℓ': 'l', 'ℴ': 'o'
  };

  Object.keys(specialChars).forEach(special => {
    result = result.replace(new RegExp(special, 'g'), specialChars[special]);
  });

  // Final normalization
  return result.normalize('NFC');
}


const normalizeContributerName = name => {
  return name
    .replace('[', '')
    .replace(']', '')
    .trim()
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
  normalizeString,
  normalizeAllUnicodeText,
  normalizeContributerName
}
