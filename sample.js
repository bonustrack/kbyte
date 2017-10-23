const kbyte = require('.');

const client = new kbyte.Client('wss://byteball.org/bb');

client.send(
  'subscribe',
  {
    subscription_id: '1',
    last_mci: 1273070,
  },
  (err, result) => {
    console.log(err, result[0].body);
  },
);
