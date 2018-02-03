const crypto = require('crypto');
const Mnemonic = require('bitcore-mnemonic');
// const bip39 = require('bip39');

const createKeys = (deviceName, passphrase) => {
  const deviceTempPrivKey = crypto.randomBytes(32);
  const devicePrevTempPrivKey = crypto.randomBytes(32);
  let mnemonic = new Mnemonic(); // generates new mnemonic
  while (!Mnemonic.isValid(mnemonic.toString()))
    mnemonic = new Mnemonic();
  return {
    deviceName,
    passphrase,
    mnemonic_phrase: mnemonic.phrase,
    temp_priv_key: deviceTempPrivKey.toString('base64'),
    prev_temp_priv_key: devicePrevTempPrivKey.toString('base64')
  };
};

export default {
  createKeys,
};
