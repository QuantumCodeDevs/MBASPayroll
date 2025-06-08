import { Injectable } from '@angular/core';
import { IncomingData } from '../models/IncommingData';
import { OutputFile } from '../models/OutputFile';
import { InputFile } from '../models/InputFile';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
  providedIn: 'root',
})

export class FileProcessingService {
  outputData!: string;

  constructor() { }

  //Check file type and process accordingly
  static processFile(date?: Date, format?: string, data?: string): OutputFile {
    if (!data) {
      throw new Error('data is undefined');
    }

    console.log(data);
    // Convert CSV string to an array of InputData
    var clinicianArray = mapInputDatatoClinicianArray(data);

    clinicianArray = clinicianArray.slice(1);


    return new OutputFile({
      FileName: `${date}processed_clinicians.${format}`,
      Data: arrayToCsv(clinicianArray)
    });
  }

}

function mapInputDatatoClinicianArray(data: string): IncomingData[] {
  return JSON.parse(data!).map((c: IncomingData) =>
    new IncomingData({
      DateOfService: c.DateOfService,
      Client: c.Client,
      Clinician: c.Clinician,
      BillingCode: c.BillingCode,
      RatePerUnit: c.RatePerUnit,
      Units: c.Units,
      TotalFee: c.TotalFee,
      ProgressNoteStatus: c.ProgressNoteStatus,
      ClientPaymentStatus: c.ClientPaymentStatus,
      Charge: c.Charge,
      Uninvoiced: c.Uninvoiced,
      Paid: c.Paid,
      Unpaid: c.Unpaid
    }));;
}

function arrayToCsv(data: any[]): string {
  if (!data.length) return '';
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
  return [headers, ...rows].join('\n');
}