const kbyte = require('.');

const client = new kbyte.Client('wss://byteball.org/bb');

const test = async () => {
  const witnesses = await client.send('get_witnesses', null);
  console.log('Witnesses', witnesses);
};

test();
