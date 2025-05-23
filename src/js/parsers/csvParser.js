// src/parsers/csvParser.js
const fs = require('fs');
const csv = require('csv-parser');
const Clinician = require('../models/clinician');

function parseCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        //Map to Clinician
        results.push(new Clinician(
            row.client_name,
            row.clinician_name,
            row.date_of_service,
            row.office_name,
            row.status
        ));
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = {
    parseCsvFile
}
