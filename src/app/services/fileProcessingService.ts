import { Injectable } from '@angular/core';
import { IncomingData } from '../models/IncommingData';
import { OutgoingData } from '../models/OutgoingData';
import { OutputFile } from '../models/OutputFile';
import { MISC_Billing_Codes, SHOW_BILLING_CODES, NO_SHOW_BILLING_CODES, GROUP_HOURS } from '../models/billingCodes';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
  providedIn: 'root',
})

export class FileProcessingService {
  outputData!: any; // This will hold the processed output data can be either string or array depending on the format

  constructor() { }

  processFile(dateRange?: string, format?: string, data?: string): OutputFile {
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
  }

}
// This function maps the input data string to an array of IncomingData objects
function mapInputDatatoClinicianArray(data: string): IncomingData[] {
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
}

//Filter out entries with MISC_Billing_Codes
function filterOutMiscBillingCodes(data: IncomingData[]): IncomingData[] {
  return data.filter((c: IncomingData) => {
    // Filter out entries with MISC_Billing_Codes
    return !MISC_Billing_Codes.includes(c.BillingCode?.trim() ?? '');
  });
}

//Group IncomingData by Clinician Creates a 2D array where each key is a clinician and the value is an array of IncomingData objects for that clinician
function groupByClinician(data: IncomingData[]): Map<string, IncomingData[]> {
  return data.reduce((map, clinician) => {
    const name = clinician.Clinician ?? '';
    if (!map.has(name)) {
      map.set(name, []);
    }
    map.get(name)!.push(clinician);
    return map;
  }, new Map<string, IncomingData[]>());
}

function createOutputData(groups: Map<string, IncomingData[]>): OutgoingData[] {
  console.log(groups);

  
  // Convert groups to array, sort by first name, then map to OutgoingData
  return Array.from(groups.entries())
    .sort(([aName], [bName]) => {
      const [aFirst] = aName.split(' ');
      const [bFirst] = bName.split(' ');
      return aFirst.localeCompare(bFirst);
    })
    .map(([name, clinicians]) => {
      // Split the clinician name into first and last names
      const [firstName, lastName = ''] = name.split(' ');

      // Calculate Show_Hours and Late_No_Show_Hours based on BillingCode
      const showHoursNotes = clinicians
        .filter((c: IncomingData) => SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '')&& c.ProgressNoteStatus?.toLowerCase().trim() !== 'no note')
        .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);

      const showHoursNoNotes = clinicians
        .filter((c: IncomingData) => SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ProgressNoteStatus?.toLowerCase().trim() === 'no note')
        .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);

      const lateNoShowHoursPaid = clinicians
        .filter((c: IncomingData) => NO_SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ClientPaymentStatus?.toLowerCase().trim() === 'paid')
        .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);

      const lateNoShowHoursUnPaid = clinicians
        .filter((c: IncomingData) => NO_SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ClientPaymentStatus?.toLowerCase().trim() === 'unpaid')
        .reduce((sum, c) => sum + (typeof c.Units === 'number' ? c.Units : parseFloat(c.Units ?? '0')), 0);

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
    });
}

// Converts an array of objects to a CSV string
function arrayToCsv(data: any[]): string {
  if (!data.length) return '';
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
  return [headers, ...rows].join('\n');
}