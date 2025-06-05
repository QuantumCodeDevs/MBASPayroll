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
          row["Date of Service"],
          row["Client"],
          row["Clinician"],
          row["Billing Code"],
          row["Rate per Unit"],
          row["Units"],
          row["Total Fee"],
          row["Progress Note Status"],
          row["Client Payment Status"],
          row["Charge"],
          row["Uninvoiced"],
          row["Paid"],
          row["Unpaid"]
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
