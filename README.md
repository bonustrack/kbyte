[![npm](https://img.shields.io/npm/v/kbyte.svg)](https://www.npmjs.com/package/kbyte)
[![Try kbyte on RunKit](https://badge.runkitcdn.com/kbyte.svg)](https://runkit.com/bonustrack/kbyte)

# kbyte.js

A lightweight JavaScript library for Byteball

### Install
```
npm install kbyte --save
```

### Usage
```js
var kbyte = require('kbyte');

// Init WebSocket client
var client = new kbyte.Client('wss://byteball.org/bb');

// Get peers
client.send('get_peers', null, function(err, result) {
  console.log(err, result);
});
```
[See more examples](/test/test.js)

### Promises

You can also use kbyte with promises by promisifying kbyte with
[bluebird](https://github.com/petkaantonov/bluebird) as in:

```js
var kbyte = require('kbyte');
bluebird.promisifyAll(kbyte.Client.prototype);
```

It'll add a *Async* to all kbyte functions (e.g. return client.sendAsync().then())
client.send('get_peers', null, function(err, result) {
  console.log(err, result);
});
```js
// So instead of writing client.send('get_peers', null, cb); you have to write:
return client.sendAsync('get_peers', null).then(function(result) {
  console.log(result); // => ['wss://byteroll.com/bb', 'wss://byteball.fr/bb' ...]
});
```

## License

[MIT](LICENSE).
