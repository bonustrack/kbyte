import crypto from 'crypto';
import Mnemonic from 'bitcore-mnemonic';
import Bitcore from 'bitcore-lib';
import objectHash from 'byteballcore/object_hash';
import validationUtils from 'byteballcore/validation_utils';

/**
 * Generate Private Account
 * @returns {{address: *, pub_key, priv_key: string, mnemonic_phrase: *}}
 */
const genPrivAccount = () => {
  const passphrase = 'passphrase';

  const deviceTempPrivKey = crypto.randomBytes(32);
  const devicePrevTempPrivKey = crypto.randomBytes(32);

  let mnemonic = new Mnemonic();
  while (!Mnemonic.isValid(mnemonic.toString()))
    mnemonic = new Mnemonic();

  const keys = {
    mnemonic_phrase: mnemonic.phrase,
    temp_priv_key: deviceTempPrivKey.toString('base64'),
    prev_temp_priv_key: devicePrevTempPrivKey.toString('base64')
  };

  const xPrivKey = mnemonic.toHDPrivateKey(passphrase);
  const devicePrivKey = xPrivKey.derive("m/1'").privateKey.bn.toBuffer({ size: 32 });
  const strXPubKey = Bitcore.HDPublicKey(xPrivKey.derive("m/44'/0'/0'")).toString();

  const wallet = crypto.createHash('sha256').update(strXPubKey, 'utf8').digest('base64');

  function derivePubkey(xPubKey, path){
    const hdPubKey = new Bitcore.HDPublicKey(xPubKey);
    return hdPubKey.derive(path).publicKey.toBuffer().toString('base64');
  }

  const isChange = 0;
  const addressIndex = 1;
  const pubkey = derivePubkey(strXPubKey, `m/${isChange}/${addressIndex}`);
  const address = objectHash.getChash160(['sig', { pubkey }]);

  return {
    address,
    pub_key: pubkey,
    priv_key: devicePrivKey.toString('base64'),
    mnemonic_phrase: keys.mnemonic_phrase,
  };
};

export default {
  genPrivAccount,
  isValidAddress: validationUtils.isValidAddress,
  isValidDeviceAddress: validationUtils.isValidDeviceAddress,
};
