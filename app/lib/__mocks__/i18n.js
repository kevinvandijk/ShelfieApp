const i18n = jest.genMockFromModule('../i18n');

module.exports = {
  namespace: () => {
    return (key) => key;
  },

  t: () => {
    return (key) => key;
  }
};
