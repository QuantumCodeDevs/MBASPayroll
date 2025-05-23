import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ElectronAPIService } from '../../services/electronAPIService';
import { ThemeService } from '../../services/themeService';
import { InputFile } from '../../models/inputFile';
import { ExcelData } from '../../models/ExcelData';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' //,
  //encapsulation: ViewEncapsulation.None, // <-- Disable encapsulation

})


export class HomeComponent implements OnInit {
  selectedFile: string | undefined;
  data: ExcelData[] =[];

  //Inject ElectronAPIService
  constructor(private electronAPIService: ElectronAPIService, themeService: ThemeService) { }

  ngOnInit(): void {
    // this.electronAPIService.getVersion().then((version) => {
    //   this.appVersion = version;
    // });

  }

  async selectFile() {
    //Select and get the file contents
    const file: InputFile = await this.electronAPIService.selectFile();
    //Turn the data string into an array
    const clinicianArray = JSON.parse(file.Data);
    //Map the array to the object for Incomming ExcelData
    this.data = clinicianArray.map((c: ExcelData) =>
      new ExcelData({
        ClientName: c.ClientName,
        ClinicianName: c.ClinicianName,
        DateOfService: c.DateOfService,
        OfficeName: c.OfficeName,
        Status: c.Status
      }));


    //Set the filename
    this.selectedFile = file.FileName;
  }

  async saveFile() {
    const csv = this.arrayToCsv(this.data);

    console.log(csv);

    await this.electronAPIService.saveFile("test.csv", JSON.stringify(this.data));
  }

  async processFile() {
    if (this.data != null) {
      console.log("process file");
      //Process File
      //this.data = ProcessingService.ProcessFile(this.data);

      await this.saveFile();

    }
  }

  // arrayToCsv<T extends Record<string, any>>(data: T[]): string {
  //   if (!data || data.length === 0) return '';

  //   const headers = Object.keys(data[0]) as (keyof T)[];
  //   const csvRows: string[] = [];

  //   // Add the header row
  //   csvRows.push(headers.join(','));

  //   // Add data rows
  //   for (const row of data) {
  //     const values = headers.map(header => {
  //       const value = row[header];

  //       // Escape double quotes and wrap each field in quotes
  //       return `"${String(value ?? '').replace(/"/g, '""')}"`;
  //     });

  //     csvRows.push(values.join(','));
  //   }

  //   return csvRows.join('\n');
  // }

  arrayToCsv(data: any[]): string {
  if (!data.length) return '';
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(','));
  return [headers, ...rows].join('\n');
}
}
