import { Injectable } from '@angular/core';
import { IncomingData } from '../models/IncommingData';
import { OutputFile } from '../models/OutputFile';


@Injectable({
    providedIn: 'root',
})

export class ExcelProcessingService {
    constructor() { }

    processCSV(csvData?: string): OutputFile {
        //Turn the data string into an array
        const clinicianArray = JSON.parse(csvData!).map((c: IncomingData) =>
              new IncomingData({
                ClientName: c.ClientName,
                ClinicianName: c.ClinicianName,
                DateOfService: c.DateOfService,
                OfficeName: c.OfficeName,
                Status: c.Status
              }));;

        return new OutputFile({
            FileName: "processed_clinicians.json",
            Data: this.arrayToCsv(clinicianArray)
        });
    }







    //Move to CSV Processor
  //Used to convert array to CSV format
  arrayToCsv(data: any[]): string {
    if (!data.length) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    return [headers, ...rows].join('\n');
  }
}