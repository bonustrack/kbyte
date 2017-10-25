const kbyte = require('.');

const client = new kbyte.Client('wss://byteball.org/bb');

const test = async () => {
  const witnesses = await client.send('get_witnesses', null);
  console.log('Witnesses', witnesses);

  const catchup = await client.send('catchup', {
    last_stable_mci: 1294024,
    last_known_mci: 1294064,
    witnesses,
  });
  console.log(catchup);
};

test();
