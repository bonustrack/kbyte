// const assert = require('assert');
const kbyte = require('..');
const bluebird = require('bluebird');

bluebird.promisifyAll(kbyte.Client.prototype);
const client = new kbyte.Client('wss://obyte.org/bb');

const test = async () => {
  /** Get witnesses */
  const witnesses = await client.requestAsync('get_witnesses', null);
  console.log('Witnesses', witnesses);

  /** Get parents */
  const parents = await client.requestAsync('light/get_parents_and_last_ball_and_witness_list_unit', {
    witnesses,
  });
  console.log('Parents', parents);

  /** Get peers */
  const peers = await client.requestAsync('get_peers', null);
  console.log('Peers', peers);

  /** Get history */
  const history = await client.requestAsync('light/get_history', {
    witnesses,
    requested_joints: [parents.last_stable_mc_ball_unit],
    // addresses: [],
  });
  console.log('History', history);

  /** Get joint */
  const joint = await client.requestAsync('get_joint', parents.last_stable_mc_ball_unit);
  console.log('Joint', joint);

  /** Get bots */
  const bots = await client.requestAsync('hub/get_bots', null);
  console.log('Bots', bots);

  /** Get last MCI */
  const mci = await client.requestAsync('get_last_mci', null);
  console.log('Last MCI', mci);

  /** Subscribe */
  const subscribe = await client.requestAsync('subscribe', {
    subscription_id: '1',
    last_mci: mci,
  });
  console.log('Subscribe', subscribe);

  /** Catchup */
  const catchup = await client.requestAsync('catchup', {
    last_stable_mci: mci - 10,
    last_known_mci: mci,
    witnesses,
  });
  console.log('Catchup', catchup);

  /** Get hash tree */
  const hashTree = await client.requestAsync('get_hash_tree', {
    from_ball: joint.joint.unit.last_ball,
    to_ball: parents.last_stable_mc_ball,
  });
  console.log('Hash tree', hashTree);

  /** Get attestation */
  const attestation = await client.requestAsync('light/get_attestation', {
    attestor_address: 'H5EZTQE7ABFH27AUDTQFMZIALANK6RBG',
    field: 'email',
    value: 'fabien@bonustrack.co',
  });
  console.log('Attestation', attestation);

  /** Get attestations */
  const attestations = await client.requestAsync('light/get_attestations', {
    address: 'ULQA63NGEZACP4N7ZMBUBISH6ZTCUS2Q',
  });
  console.log('Attestations', attestations);

  /** Pick divisible coins for amount */
  const inputs = await client.requestAsync('light/pick_divisible_coins_for_amount', {
    asset: 'xamdfH5Uk+alv3le0pEA01qSsfZjycyMsqaqHtycJ1M=',
    addresses: ['ULQA63NGEZACP4N7ZMBUBISH6ZTCUS2Q'],
    last_ball_mci: 1000000000,
    amount: 10000,
    spend_unconfirmed: 'own',
  });
  console.log('Inputs', inputs);

  /** Get asset metadata */
  const assetMetadata = await client.requestAsync('hub/get_asset_metadata', '1OLPCz72F1rJ7IGtmEMuV1LvfLawT9WGOFuHugW2b7c=');
  console.log('Asset metadata', assetMetadata);

  /** Subscribe to WebSocket notifications */
  client.subscribe((err, result) => {
    console.log('Subscribe', err, result);
  });

  /** New address to watch */
  client.justsaying('light/new_address_to_watch', 'BVVJ2K7ENPZZ3VYZFWQWK7ISPCATFIW3');
};

test();
