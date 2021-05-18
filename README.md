# Free SVG Node.js Library
> A Free SVG (FreeSVG.org) client library for Node.js.

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

[Github](https://github.com/jaredcrimmins/free-svg-nodejs) | [NPM](https://www.npmjs.com/package/free-svg)

## Install

```shell
npm install free-svg
```

## Usage

```javascript
const {FreeSVG} = require('free-svg');

const freeSVG = new FreeSVG('FreeSVGBearerToken');

freeSVG.search({query: 'example search query'})
.then(result => {
  // Do something with the search result.
})
.catch(error =>  {
  // Request failed.
});
```

## API

### Options

- `agent` - default `undefined`;
- `hostname` - default `reserve.freesvg.org`; The hostname that the client
connects to. Setting this may be valueable for debugging/testing or if 
FreeSVG changes its API address.
- `protocol` - default `https:`;
- `port` - default `443`;
- `timeout` - default `undefined`; Milliseconds before a request times out.