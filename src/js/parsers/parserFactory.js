const { parseCsv } = require('./csvParser');
// const { parseXlsx } = require('./xlsxParser');

function getParser(ext) {
  switch (ext) {
    case '.csv':
      return parseCsv;
    // case '.xlsx':
    //   return parseXlsx;
    default:
      throw new Error('Unsupported file format');
  }
}

module.exports = { getParser };