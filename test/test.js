// const assert = require('assert');
const kbyte = require('..');

const client = new kbyte.Client('wss://byteball.org/bb');

const test = async () => {
  /** Get Witnesses */
  const witnesses = await client.send('get_witnesses', null);
  console.log('Witnesses', witnesses);

  /** Get Parents */
  const parents = await client.send('light/get_parents_and_last_ball_and_witness_list_unit', {
    witnesses,
  });
  console.log('Parents', parents);

  /** Get Peers */
  const peers = await client.send('get_peers', null);
  console.log('Peers', peers);

  /** Get History */
  const history = await client.send('light/get_history', {
    witnesses,
    requested_joints: [parents.last_stable_mc_ball_unit]
  });
  console.log('History', history);

  /** Get Joint */
  const joint = await client.send('get_joint', parents.last_stable_mc_ball_unit);
  console.log('Joint', joint);
};

test();
