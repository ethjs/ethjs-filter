function setupFilter(method, filterName, query, param, cb) {
  const self = method;
  const filterInputs = [];
  self.filterId = null;
  self.delay = 300;

  // if it's a Filter object
  if (param !== null) {
    filterInputs.push(param);
  }

  // add complex callback
  filterInputs.push((setupError, filterId) => {
    if (!setupError) {
      self.filterId = filterId;
    }

    if (typeof cb !== 'undefined') {
      cb(setupError, filterId);
    }
  });

  // apply filter, call new.. filter method
  query[`new${filterName}`].apply(query, filterInputs);
}

function filters(filterName, query) {
  return {
    Filter: function Filter(param, cb) {
      setupFilter(this, filterName, query, param, cb);
    },
    BlockFilter: function BlockFilter(cb) {
      setupFilter(this, filterName, query, null, cb);
    },
    PendingTransactionFilter: function PendingTransactionFilter(cb) {
      setupFilter(this, filterName, query, null, cb);
    },
  };
}

function constructFilter(filterName, query) {
  const filterMethods = filters(filterName, query);
  const filter = filterMethods[filterName];
  filter.prototype.watch = function watch(callback) {
    const self = this;
    self.interval = setInterval(() => {
      if (self.filterId !== null) {
        query.getFilterChanges(self.filterId, (changeError, changeResult) => {
          callback(changeError, changeResult);
        });
      }
    }, self.delay);
  };
  filter.prototype.stopWatching = function stopWatching(callback) {
    const self = this;
    if (self.filterId !== null) {
      clearInterval(self.interval);
      query.uninstallFilter(self.filterId, (uninstallError, uninstallResilt) => {
        self.filterId = null;
        callback(uninstallError, uninstallResilt);
      });
    }
  };

  return filter;
}

function EthFilter(query) {
  const self = this;
  self.Filter = constructFilter('Filter', query);
  self.BlockFilter = constructFilter('BlockFilter', query);
  self.PendingTransactionFilter = constructFilter('PendingTransactionFilter', query);
}

module.exports = EthFilter;
