# onix-parser

Parse ONIX 3.0 XML files and extract structured product data for publishing and digital books.

## Features
- Parses ONIX 3.0 XML files
- Extracts product metadata, identifiers, titles, contributors, prices, resources, and more
- Supports both EPUB and Audiobook ONIX files
- Returns results as easy-to-use JSON

## Installation

```bash
npm install onix-parser
```

## Usage

```js
const onix = require('onix-parser');

(async () => {
  const result = await onix('./files/bw-teste1.xml');
  if (result.status) {
    console.log(result.data);
  } else {
    console.error('Error:', result.message);
  }
})();
```

## API

### onix(onixFilePath)

- `onixFilePath` (string): Path to the ONIX XML file
- Returns: `Promise<{ status: boolean, data?: object, message?: string[] }>`

## Output Example

```json
{
  "recordReference": "...",
  "notificationType": "...",
  "identifiers": [ ... ],
  "title": { ... },
  "contributors": [ ... ],
  "price": [ ... ],
  ...
}
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
ISC