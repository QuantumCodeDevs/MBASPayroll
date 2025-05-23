const fs = require('fs');
const csvParser = require('csv-parser');
// const xlsx = require('xlsx'); // Uncomment if you want XLSX support

class Clinician {
  constructor() {
    this.ClientName = undefined;
    this.ClinicianName = undefined;
    this.DateOfService = undefined;
    this.OfficeName = undefined;
    this.Status = undefined;
  }
}

// Define the FileProcessing class
class FileProcessor {
  // Static function to read and parse either a CSV or XLSX file
  static readFile(filePath) {
    return new Promise((resolve, reject) => {
      const ext = filePath.split('.').pop().toLowerCase();
      if (ext === 'csv') {
        // If the file is CSV, use csv-parser
        FileProcessing.parseCsv(filePath, resolve, reject);
      // } else if (ext === 'xlsx') {
      //   // If the file is XLSX, use xlsx
      //   FileProcessing.parseXlsx(filePath, resolve, reject);
      } else {
        reject(new Error('Unsupported file format'));
      }
    });
  }

  // Static function to parse CSV files
  static parseCsv(filePath, resolve, reject) {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => {
        const clinician = FileProcessing.mapToClinician(data);
        results.push(clinician);
      })
      .on('end', () => resolve(results)) // Resolve with the array of objects
      .on('error', (err) => reject(err)); // Reject if an error occurs
  }

  // Static function to parse XLSX files (commented out)
  /*
  static parseXlsx(filePath, resolve, reject) {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      const results = data.map((row) => FileProcessing.mapToClinician(row));
      resolve(results);
    } catch (err) {
      reject(err);
    }
  }
  */

  // Static function to map data from CSV or XLSX to a predefined Clinician object
  static mapToClinician(data) {
    // Example mapping - customize as needed
    // const [firstName, lastName] = data.Name ? data.Name.split(' ') : ['Unknown', 'Unknown'];
    // return {
    //   ClientFirstName: '',
    //   ClientLastName: '',
    //   ClinicianFirstName: firstName || '',
    //   ClinicianLastName: lastName || '',
    //   DateOfService: undefined,
    //   Status: ''
    // };
    return new Clinician();
  }
}

module.exports = { FileProcessor };
