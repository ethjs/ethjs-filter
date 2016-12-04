# User Guide

All information for developers using `ethjs-filter` should consult this document.

## Install

```
npm install --save ethjs-filter
```

## Usage

```js
const HttpProvider = require('ethjs-provider-http');
const Eth = require('ethjs-query');
const EthFilter = require('ethjs-filter');
const eth = new Eth(new HttpProvider('http://localhost:8545'));
const filters = new EthFilter(eth);


const filter = new filters.Filter({ delay: 300 })
.new({ toBlock: 500 })
.then((result) => {
  // result <BigNumber ...> filterId
})
.catch((error) => {
  // result null
});
filter.watch((result) => {
  // result [{...}, ...] (fires multiple times)
});
filter.uninstall(cb);


const filter = new filters.BlockFilter()
.at(7)
filter.watch((result) => {
  // result [{...}, ...] (fires multiple times)
});
filter.uninstall(cb);


const filter = new filters.PendingTransactionFilter()
.new()
.then((result) => {
  // result <BigNumber ...> filterId
})
.catch((error) => {
  // result null
});

const watcher = filter.watch((error, result) => {
  // result null ['0xfd234829...', '0xsf2030d1...']
});
watcher.stopWatching(cb);

filter.uninstall()
.then((result) => {
  // result true
})
.catch((error) => {
  // result null
});
```

## Available Filters

There are three kinds of available filters `Filter`, `BlockFilter` and `PendingTransactionFilter`.

## Polling

Each filter object starts a single interval to poll for new changes on the filter. Multiple watchers can be installed to poll for changes. The delay of the interval polling can be set in the `Filter` constructor (i.e. `new filters.Filter({ delay: 400 })`). The delay option is in milliseconds.

## Using the `.new` method

The filter `.new` method will install the filter on the `Ethereum` node. This is where you can specify the `eth_newFilter` param object (i.e. `{ toBlock: 5, fromBlock: 'latest' }` etc.).

## Using the `.at` method

If you have a filter already installed at a specific filter ID. You can setup another filter instance at that filter id, by using the `.at` method (i.e. `filter.at(filterId)`). The filter id can be specified as a type **Number**, number as a **String** or BigNumber **Instance**.

## Uninstalling

Uninstalling the filter will clear the filter interval and uninstall the fitler from the node.

## Browser Builds

`ethjs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/ethjs-filter.js` or `dist/ethjs-filter.min.js` directly into an HTML file to start using this module. Note, an `EthFilter` object is made available globally.

```html
<script type="text/javascript" src="ethjs-filter.min.js"></script>
<script type="text/javascript">
var filter = new EthFilter(...);
</script>
```

Note, even though `ethjs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

## Other Awesome Modules, Tools and Frameworks

 - [web3.js](https://github.com/ethereum/web3.js) -- the original Ethereum swiss army knife **Ethereum Foundation**
 - [ethereumjs](https://github.com/ethereumjs) -- critical ethereumjs infrastructure **Ethereum Foundation**
 - [browser-solidity](https://ethereum.github.io/browser-solidity) -- an in browser Solidity IDE **Ethereum Foundation**
 - [wafr](https://github.com/silentcicero/wafr) -- a super simple Solidity testing framework
 - [truffle](https://github.com/ConsenSys/truffle) -- a solidity/js dApp framework
 - [embark](https://github.com/iurimatias/embark-framework) -- a solidity/js dApp framework
 - [dapple](https://github.com/nexusdev/dapple) -- a solidity dApp framework
 - [chaitherium](https://github.com/SafeMarket/chaithereum) -- a JS web3 unit testing framework
 - [contest](https://github.com/DigixGlobal/contest) -- a JS testing framework for contracts

## Our Relationship with Ethereum & EthereumJS

 We would like to mention that we are not in any way affiliated with the Ethereum Foundation or `ethereumjs`. However, we love the work they do and work with them often to make Ethereum great! Our aim is to support the Ethereum ecosystem with a policy of diversity, modularity, simplicity, transparency, clarity, optimization and extensibility.

 Many of our modules use code from `web3.js` and the `ethereumjs-` repositories. We thank the authors where we can in the relevant repositories. We use their code carefully, and make sure all test coverage is ported over and where possible, expanded on.
