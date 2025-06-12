import { Injectable } from '@angular/core';
import { IncomingData } from '../models/incommingData';
import { OutgoingData } from '../models/outgoingData';
import { OutputFile } from '../models/outputFile';
import { MISC_Billing_Codes, SHOW_BILLING_CODES, NO_SHOW_BILLING_CODES, GROUP_HOURS } from '../models/billingCodes';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
  providedIn: 'root',
})

export class FileProcessingService {
  outputData!: any; // This will hold the processed output data can be either string or array depending on the format

  constructor() { }

  processFile(dateRange?: string, format?: string, data?: string): OutputFile {
    try {
      if (!data) {
        throw new Error('data is undefined');
      }

      // Convert CSV string to an array of InputData
      var clinicianArray = mapInputDatatoClinicianArray(data);
      // Filter out entries with MISC_Billing_Codes
      clinicianArray = filterOutMiscBillingCodes(clinicianArray);
      // Group by Clinician
      const groupedData = groupByClinician(clinicianArray);
      // Create output data from grouped data
      const outputData = createOutputData(groupedData);

      switch (format) {
        case 'csv':
          // If format is csv, we will convert the output data to CSV format
          this.outputData = arrayToCsv(outputData);
          break;
      }


      //Could add a switch statement here to handle different formats in the future
      return new OutputFile({
        FileName: `${dateRange}processed_clinicians.${format}`,
        Data: this.outputData
      });
    } catch (error) {
      console.error('Error processing file:', error);
      throw error; // Re-throw the error to be caught in the calling function 
    }
  }

}
// This function maps the input data string to an array of IncomingData objects
function mapInputDatatoClinicianArray(data: string): IncomingData[] {
  try {
    return JSON.parse(data!).map((c: any) =>
      new IncomingData({
        DateOfService: c['Date of Service'],
        Client: c.Client,
        Clinician: c.Clinician,
        BillingCode: c['Billing Code'],
        RatePerUnit: c['Rate Per Unit'],
        Units: c.Units,
        TotalFee: c['Total Fee'],
        ProgressNoteStatus: c['Progress Note Status'],
        ClientPaymentStatus: c['Client Payment Status'],
        Charge: c.Charge,
        Uninvoiced: c.Uninvoiced,
        Paid: c.Paid,
        Unpaid: c.Unpaid
      }));
  } catch (error) {
    console.error('Error mapping input data to clinician array:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

//Filter out entries with MISC_Billing_Codes
function filterOutMiscBillingCodes(data: IncomingData[]): IncomingData[] {
  try {
    return data.filter((c: IncomingData) => {
      // Filter out entries with MISC_Billing_Codes
      return !MISC_Billing_Codes.includes(c.BillingCode?.trim() ?? '');
    });
  } catch (error) {
    console.error('Error filtering out MISC Billing Codes:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

//Group IncomingData by Clinician Creates a 2D array where each key is a clinician and the value is an array of IncomingData objects for that clinician
function groupByClinician(data: IncomingData[]): Map<string, IncomingData[]> {
  try {
    return data.reduce((map, clinician) => {
      const name = clinician.Clinician ?? '';
      if (!map.has(name)) {
        map.set(name, []);
      }
      map.get(name)!.push(clinician);
      return map;
    }, new Map<string, IncomingData[]>());
  } catch (error) {
    console.error('Error grouping data by clinician:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

function createOutputData(groups: Map<string, IncomingData[]>): OutgoingData[] {
  // Convert groups to array, sort by first name, then map to OutgoingData
  return Array.from(groups.entries())
    // Sort by clinician name
    // This sorts by first name, then by last name
    .sort(([aName], [bName]) => {
      try {
        const aNameArray = aName.split(' ');
        const bNameArray = bName.split(' ');

        const aFirst = aNameArray[0] || '';
        const bFirst = bNameArray[0] || '';
        const aLast = aNameArray.length > 1 ? aNameArray[aNameArray.length - 1] : '';
        const bLast = bNameArray.length > 1 ? bNameArray[bNameArray.length - 1] : '';

        // First sort by first name, then by last name
        const firstCompare = aFirst.localeCompare(bFirst);
        if (firstCompare !== 0) return firstCompare;
        return aLast.localeCompare(bLast);
      } catch (error) {
        console.error('Error sorting clinicians:', error);
        return 0; // If there's an error, keep the original order
      }
    })
    .map(([name, clinicians]) => {
      try {
        // Split the clinician name into first and last names
        const nameParts = name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

        // Calculate Show_Hours and Late_No_Show_Hours based on BillingCode
        // Show Hours with Notes and without Notes
        const showHoursNotes = clinicians
          .filter((c: IncomingData) => SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ProgressNoteStatus?.toLowerCase().trim() !== 'no note')
          .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);
        const showHoursNoNotes = clinicians
          .filter((c: IncomingData) => SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ProgressNoteStatus?.toLowerCase().trim() === 'no note')
          .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);
        // Late No Show Hours Paid and Unpaid
        const lateNoShowHoursPaid = clinicians
          .filter((c: IncomingData) => NO_SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ClientPaymentStatus?.toLowerCase().trim() === 'paid')
          .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);
        const lateNoShowHoursUnPaid = clinicians
          .filter((c: IncomingData) => NO_SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ClientPaymentStatus?.toLowerCase().trim() === 'unpaid')
          .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);
        // Group Hours
        const groupHours = clinicians
          .filter((c: IncomingData) => GROUP_HOURS.includes(c.BillingCode?.trim() ?? ''))
          .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);


        // Create and return the OutgoingData object
        return new OutgoingData({
          ClinicianFirstName: firstName,
          ClinicianLastName: lastName,
          ShowWithNotesHours: showHoursNotes,
          ShowWithoutNotesHours: showHoursNoNotes,
          LateNoShowPaidHours: lateNoShowHoursPaid,
          LateNoShowUnPaidHours: lateNoShowHoursUnPaid,
          GroupHours: groupHours,
          NotePaidHours: showHoursNotes + lateNoShowHoursPaid,
          TotalHours: showHoursNotes + showHoursNoNotes + lateNoShowHoursPaid + lateNoShowHoursUnPaid,
          Notes: '',
        });
      } catch (error) {
        console.error('Error processing clinician:', name, error);
        throw error; // Re-throw the error to be caught in the calling function
      }
    });
}

// Converts an array of objects to a CSV string
function arrayToCsv(data: any[]): string {
  try {
    if (!data.length) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    return [headers, ...rows].join('\n');
  } catch (error) {
    console.error('Error converting array to CSV:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}