import crypto from 'crypto';

/**
 * Generate Private Account
 * @returns {{mnemonic_phrase: string, temp_priv_key: string, prev_temp_priv_key: string}}
 */
const genPrivAccount = () => {
  const deviceTempPrivKey = crypto.randomBytes(32);
  const devicePrevTempPrivKey = crypto.randomBytes(32);
  return {
    temp_priv_key: deviceTempPrivKey.toString('base64'),
    prev_temp_priv_key: devicePrevTempPrivKey.toString('base64'),
  };
};

export default {
  genPrivAccount,
};
