[![npm](https://img.shields.io/npm/v/kbyte.svg)](https://www.npmjs.com/package/kbyte)
[![Try kbyte on RunKit](https://badge.runkitcdn.com/kbyte.svg)](https://runkit.com/bonustrack/kbyte)

# kbyte.js

A lightweight JavaScript library for Obyte

### Install
kbyte was designed to work both in the browser and in Node.js.

#### Node.js
To install kbyte on Node.js, open your terminal and run:
```
npm install kbyte
```

#### Browser
You can create an index.html file and include kbyte with:
```html
<script src="https://cdn.jsdelivr.net/npm/kbyte"></script>
```

### Usage
```js
var kbyte = require('kbyte');

// Init WebSocket client
var client = new kbyte.Client('wss://obyte.org/bb');

// Get peers
client.request('get_peers', null, function(err, result) {
  console.log(err, result);
});
```
[See more examples](/test/test.ts)

### Promises

You can also use kbyte with promises by promisifying kbyte with
[bluebird](https://github.com/petkaantonov/bluebird) as in:

```js
var kbyte = require('kbyte');
bluebird.promisifyAll(kbyte.Client.prototype);
```

It'll add a *Async* to all kbyte functions (e.g. return client.requestAsync().then())
client.request('get_peers', null, function(err, result) {
  console.log(err, result);
});
```js
// So instead of writing client.request('get_peers', null, cb); you have to write:
client.requestAsync('get_peers', null).then(function(result) {
  console.log(result); // => ['wss://byteroll.com/bb', 'wss://byteball.fr/bb' ...]
});
```

### License

[MIT](LICENSE).
