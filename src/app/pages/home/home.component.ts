import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ElectronAPIService } from '../../services/electronAPIService';
import { InputFile } from '../../models/InputFile';
import { ExcelProcessingService } from '../../services/excelProcessingService';
import { OutputFile } from '../../models/OutputFile';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' //,
  //encapsulation: ViewEncapsulation.None, // <-- Disable encapsulation

})

export class HomeComponent implements OnInit {
  inputFile: InputFile | undefined;
  outputFile: OutputFile | undefined

  //Inject ElectronAPIService
  constructor(private electronAPIService: ElectronAPIService, private excelProcessingService: ExcelProcessingService) { }

  ngOnInit(): void {

  }

  async selectFile() {
    this.inputFile = await this.electronAPIService.selectFile();
  }

  async saveFile() {
    await this.electronAPIService.saveFile("test.csv", this.outputFile?.Data);
  }

  async processFile() {
    if (this.inputFile != null) {
      this.outputFile = this.excelProcessingService.processCSV(this.inputFile.Data);
      
      await this.saveFile();
    }
  }
}
