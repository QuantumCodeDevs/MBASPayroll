const fs = require('fs').promises;
const path = require('path');
const { getParser } = require('./parsers/parserFactory');

class FileProcessor {
  static async readAndParse(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const parser = getParser(ext);
    return await parser(filePath);
  }

  static async writeFile(filePath, data) {
    await fs.writeFile(filePath, data);
  }
}

module.exports = { FileProcessor };