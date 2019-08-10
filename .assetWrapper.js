module.exports = async ({ name }) => {
  if (name.endsWith('.js')) {
    return {
      header: ';let parcelRequire=null;',
      footer: '',
    };
  }
};
