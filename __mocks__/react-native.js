const rn = require('react-native');

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});

jest.mock('NetInfo', () => {
  return {
    isConnected: {
      fetch: () => {
        return new Promise((accept) => {
          accept(true);
        });
      }
    }
  };
});

jest.mock('AsyncStorage', () => {
  function getTestData() {
    return {};
  }

  function multiGetTestData() {
    return [
      ['key1', JSON.stringify({ valor: 1 })],
      ['key2', JSON.stringify({ valor: 2 })],
    ];
  }

  return {
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),

    multiSet: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),

    getItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(JSON.stringify(getTestData()));
      });
    }),

    multiGet: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(multiGetTestData());
      });
    }),

    removeItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),

    getAllKeys: jest.fn(() => {
      return new Promise((resolve) => {
        resolve([]);
      });
    }),

    flushGetRequests: jest.fn(() => {
      return new Promise((resolve) => {
        resolve();
      });
    })
  };
});

module.exports = rn;
