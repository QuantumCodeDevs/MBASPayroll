import { Injectable } from '@angular/core';
import { IncomingData } from '../models/incomingData';
import { OutgoingData } from '../models/outgoingData';
import { OutputFile } from '../models/outputFile';
import { MISC_Billing_Codes, SHOW_BILLING_CODES, NO_SHOW_BILLING_CODES, GROUP_HOURS } from '../models/billingCodes';
import { ArrayUtils } from '../utils/array-utils';

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

      // Convert incoming string to an array of InputData
      var clinicianArray = ArrayUtils.mapInputDataToArray<IncomingData>(data);
      // Filter out entries with MISC_Billing_Codes
      clinicianArray = filterOutMiscBillingCodes(clinicianArray);

      // Group by Clinician
      var groupedData = groupByClinician(clinicianArray);
      // Sort Groups
      groupedData = sortClinicians(groupedData);

      // Create output data from sorted grouped data
      const outputData = createOutputData(groupedData);

      //Format the output data
      switch (format) {
        case 'csv':
          // If format is csv, we will convert the output data to CSV format
          this.outputData = ArrayUtils.arrayToCsv(outputData);
          break;
      }

      //Create the output file
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

//Sort Clinician Groups
function sortClinicians(groups: Map<string, IncomingData[]>): Map<string, IncomingData[]> {
  try {
    const sortedEntries = Array.from(groups.entries())
      .sort(([aName], [bName]) => {
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
      });
    return new Map<string, IncomingData[]>(sortedEntries);

  } catch (error) {
    console.error('Error sorting clinicians:', error);
    return groups; // If there's an error, keep the original order
  }
}

//Create Output data
function createOutputData(groups: Map<string, IncomingData[]>): OutgoingData[] {
  try {
    // Convert groups to array, sort by first name, then map to OutgoingData
    return Array.from(groups.entries())
      .map(([name, clinicians]) => {
        // Split the clinician name into first and last names
        const nameParts = name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

        // Calculate hours based on BillingCodes
        // Show Hours with Notes
        const showHoursNotes = clinicians
          .filter((c: IncomingData) => SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ProgressNoteStatus?.toLowerCase().trim() !== 'no note').length;
        // Show Hours without Notes
        const showHoursNoNotes = clinicians
          .filter((c: IncomingData) => SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ProgressNoteStatus?.toLowerCase().trim() === 'no note').length;

        // Late No Show Hours Paid
        const lateNoShowHoursPaid = clinicians
          .filter((c: IncomingData) => NO_SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ClientPaymentStatus?.toLowerCase().trim() === 'paid').length;
        // Late No Show Hours Unpaid
        const lateNoShowHoursUnPaid = clinicians
          .filter((c: IncomingData) => NO_SHOW_BILLING_CODES.includes(c.BillingCode?.trim() ?? '') && c.ClientPaymentStatus?.toLowerCase().trim() === 'unpaid').length;

        // Group Hours
        const groupHours = clinicians
          .filter((c: IncomingData) => GROUP_HOURS.includes(c.BillingCode?.trim() ?? '')).length;

        // Create and return the OutgoingData object
        return new OutgoingData({
          clinicianFirstName: firstName,
          clinicianLastName: lastName,
          showWithNotesHours: showHoursNotes,
          showWithoutNotesHours: showHoursNoNotes,
          lateNoShowPaidHours: lateNoShowHoursPaid,
          lateNoShowUnPaidHours: lateNoShowHoursUnPaid,
          groupHours: groupHours,
          notePaidHours: showHoursNotes + lateNoShowHoursPaid,
          totalHours: showHoursNotes + showHoursNoNotes + lateNoShowHoursPaid + lateNoShowHoursUnPaid,
          notes: '',
        });
      });
  } catch (error) {
    console.error('Error processing clinician:', name, error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}