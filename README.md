[![npm](https://img.shields.io/npm/v/kbyte.svg)](https://www.npmjs.com/package/kbyte)
[![Try kbyte on RunKit](https://badge.runkitcdn.com/kbyte.svg)](https://npm.runkit.com/bonustrack/kbyte)

# kbyte

A lightweight JavaScript library for Byteball

### Install
```
npm install kbyte --save
```

### Usage
```js
import kbyte from 'kbyte';

// Init WebSocket client
const client = new kbyte.Client('wss://byteball.org/bb');

// Get peers
client.send('get_peers', null, (err, result) => {
  console.log(err, result);
});
```
[See more examples](/test/test.js)

## License

[MIT](LICENSE).
