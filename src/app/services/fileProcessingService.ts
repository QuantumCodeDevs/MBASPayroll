import { Injectable } from '@angular/core';
import { IncomingData } from '../models/IncommingData';
import { OutputFile } from '../models/OutputFile';
import { InputFile } from '../models/InputFile';
import { CsvProcessor } from './csvProcessor';

//Injectable decorator allows this service to be injected into components or other services
@Injectable({
  providedIn: 'root',
})

export class FileProcessingService {
  outputData?: string;

  constructor() { }

  //Check file type and process accordingly
  processFile(date?: Date, inputFile?: InputFile): OutputFile {
    if (!inputFile) {
      throw new Error('inputFile is undefined');
    }

    switch (inputFile?.FileName?.split('.').pop()?.toLowerCase()) {
      case 'csv':
        this.outputData = CsvProcessor.processCsvData(inputFile.Data);

        break;
    }




    return new OutputFile({
      FileName: `${date}processed_clinicians.csv`,
      Data: this.outputData
    });
  }

}