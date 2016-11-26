const TestRPC = require('ethereumjs-testrpc');
const provider = TestRPC.provider();
const Eth = require('ethjs-query');
const EthFilter = require('../index.js');
const assert = require('chai').assert;
const sha3 = require('ethjs-sha3');
const abi = require('ethjs-abi');
console.warn = function warn() {}; // eslint-disable-line

describe('EthFilter', () => {
  describe('functionality testing', () => {
    it('should construct properly', () => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      assert.equal(typeof filters.Filter, 'function');
      assert.equal(typeof filters.Filter, 'function');
      assert.equal(typeof filters.Filter, 'function');
    });

    it('should construct Filter eth_newFilter properly with callback', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      const filter = new filters.Filter({}, (error, result) => {
        assert.equal(error, null);
        assert.equal(typeof result, 'object');
        assert.equal(result.toNumber(10) >= 0, true);
        done();
      });

      assert.notEqual(typeof filter.filterId, 'undefined');
      assert.equal(typeof filter.watch, 'function');
      assert.equal(typeof filter.stopWatching, 'function');
    });

    it('should construct Filter eth_newFilter properly without callback', () => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);
      const filter = new filters.Filter({});
      assert.notEqual(typeof filter.filterId, 'undefined');
      assert.equal(typeof filter.watch, 'function');
      assert.equal(typeof filter.stopWatching, 'function');
    });

    it('should construct BlockFilter eth_newBlockFilter properly with callback', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      const filter = new filters.BlockFilter((error, result) => {
        assert.equal(error, null);
        assert.equal(typeof result, 'object');
        assert.equal(result.toNumber(10) >= 0, true);
        done();
      });

      assert.notEqual(typeof filter.filterId, 'undefined');
      assert.equal(typeof filter.watch, 'function');
      assert.equal(typeof filter.stopWatching, 'function');
    });

    it('should construct BlockFilter eth_newFilter properly without callback', () => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);
      const filter = new filters.BlockFilter();
      assert.notEqual(typeof filter.filterId, 'undefined');
      assert.equal(typeof filter.watch, 'function');
      assert.equal(typeof filter.stopWatching, 'function');
    });

    it('should construct PendingTransactionFilter eth_newPendingTransactionFilter properly with callback', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      const filter = new filters.PendingTransactionFilter((error, result) => {
        assert.equal(error, null);
        assert.equal(typeof result, 'object');
        assert.equal(result.toNumber(10) >= 0, true);
        done();
      });

      assert.notEqual(typeof filter.filterId, 'undefined');
      assert.equal(typeof filter.watch, 'function');
      assert.equal(typeof filter.stopWatching, 'function');
    });

    it('should construct PendingTransactionFilter eth_newPendingTransactionFilter properly without callback', () => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);
      const filter = new filters.PendingTransactionFilter();
      assert.notEqual(typeof filter.filterId, 'undefined');
      assert.equal(typeof filter.watch, 'function');
      assert.equal(typeof filter.stopWatching, 'function');
    });

    it('Filter watch and stopWatching should function properly', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      eth.accounts((accountsError, accounts) => {
        var count = 0; // eslint-disable-line

        const filter = new filters.Filter({ fromBlock: 0, toBlock: 'latest', address: accounts[0] });
        assert.notEqual(typeof filter.filterId, 'undefined');
        assert.equal(typeof filter.watch, 'function');
        assert.equal(typeof filter.stopWatching, 'function');

        filter.watch((watchError, watchResult) => {
          assert.equal(watchError, null);
          assert.equal(Array.isArray(watchResult), true);
        });

        setTimeout(() => {
          filter.stopWatching((stopWatchError, stopWatchResult) => {
            assert.equal(stopWatchError, null);
            assert.equal(typeof stopWatchResult, 'boolean');
          });
          done();
        }, 1400);

        eth.sendTransaction({
          from: accounts[0],
          to: accounts[1],
          value: 3000,
          gas: 3000000,
          data: '0x',
        }, (txError, txResult) => {
          assert.equal(txError, null);
          assert.equal(typeof txResult, 'string');
        });
      });
    });

    it('BlockFilter watch and stopWatching should function properly', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      eth.accounts((accountsError, accounts) => {
        var count = 0; // eslint-disable-line

        const filter = new filters.BlockFilter();
        assert.notEqual(typeof filter.filterId, 'undefined');
        assert.equal(typeof filter.watch, 'function');
        assert.equal(typeof filter.stopWatching, 'function');

        filter.watch((watchError, watchResult) => {
          assert.equal(watchError, null);
          assert.equal(Array.isArray(watchResult), true);
        });

        setTimeout(() => {
          filter.stopWatching((stopWatchError, stopWatchResult) => {
            assert.equal(stopWatchError, null);
            assert.equal(typeof stopWatchResult, 'boolean');
          });
          done();
        }, 1400);

        eth.sendTransaction({
          from: accounts[0],
          to: accounts[1],
          value: 3000,
          gas: 3000000,
          data: '0x',
        }, (txError, txResult) => {
          assert.equal(txError, null);
          assert.equal(typeof txResult, 'string');
        });
      });
    });

    it('PendingTransactionFilter watch and stopWatching should function properly', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      eth.accounts((accountsError, accounts) => {
        var count = 0; // eslint-disable-line

        const filter = new filters.PendingTransactionFilter();
        assert.notEqual(typeof filter.filterId, 'undefined');
        assert.equal(typeof filter.watch, 'function');
        assert.equal(typeof filter.stopWatching, 'function');

        filter.watch((watchError, watchResult) => {
          assert.equal(watchError, null);
          assert.equal(Array.isArray(watchResult), true);
        });

        setTimeout(() => {
          filter.stopWatching((stopWatchError, stopWatchResult) => {
            assert.equal(stopWatchError, null);
            assert.equal(typeof stopWatchResult, 'boolean');
          });
          done();
        }, 1400);

        eth.sendTransaction({
          from: accounts[0],
          to: accounts[1],
          value: 3000,
          gas: 3000000,
          data: '0x',
        }, (txError, txResult) => {
          assert.equal(txError, null);
          assert.equal(typeof txResult, 'string');
        });
      });
    });

    it('contract usage watch and stopWatching should function properly', (done) => {
      const eth = new Eth(provider);
      const filters = new EthFilter(eth);

      eth.accounts((accountsError, accounts) => {
        eth.sendTransaction({
          from: accounts[0],
          gas: 3000000,
          data: '0x606060405234610000575b61010e806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146100435780636d4ce63c14610076575b610000565b346100005761005e6004808035906020019091905050610099565b60405180821515815260200191505060405180910390f35b3461000057610083610103565b6040518082815260200191505060405180910390f35b6000816000819055507f10e8e9bc5a1bde3dd6bb7245b52503fcb9d9b1d7c7b26743f82c51cc7cce917d60005433604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600190505b919050565b600060005490505b9056',
        }, (txError, txResult) => {
          assert.equal(txError, null);
          assert.equal(typeof txResult, 'string');

          // wait for tx to process, hopefully
          setTimeout(() => {
            eth.getTransactionReceipt(txResult, (receiptError, receipt) => {
              assert.equal(txError, null);
              assert.equal(typeof receipt, 'object');

              const SimpleStoreInterface = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"get","outputs":[{"name":"storeValue","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newValue","type":"uint256"},{"indexed":false,"name":"_sender","type":"address"}],"name":"SetComplete","type":"event"}]; // eslint-disable-line
              const setMethodInterface = SimpleStoreInterface[0];
              const getMethodInterface = SimpleStoreInterface[1]; // eslint-disable-line
              const setCompleteEventInterface = SimpleStoreInterface[2]; // eslint-disable-line
              const setCompleteEventTopicHash = sha3('SetComplete(uint256,address)');

              const filter = new filters.Filter({
                fromBlock: 0,
                toBlock: 'latest',
                address: receipt.contractAddress,
                topics: [setCompleteEventTopicHash],
              });
              assert.notEqual(typeof filter.filterId, 'undefined');
              assert.equal(typeof filter.watch, 'function');
              assert.equal(typeof filter.stopWatching, 'function');

              filter.watch((watchError, watchResult) => {
                assert.equal(watchError, null);
                assert.equal(Array.isArray(watchResult), true);
              });

              eth.sendTransaction({
                from: accounts[0],
                to: receipt.contractAddress,
                gas: 3000000,
                data: abi.encodeMethod(setMethodInterface, [10000]),
              }, (setTxError, setTxResult) => {
                assert.equal(setTxError, null);
                assert.equal(typeof setTxResult, 'string');
              });

              setTimeout(() => {
                filter.stopWatching((stopWatchError, stopWatchResult) => {
                  assert.equal(stopWatchError, null);
                  assert.equal(typeof stopWatchResult, 'boolean');
                });
                done();
              }, 1400);
            });
          }, 1000);
        });
      });
    });
  });
});
