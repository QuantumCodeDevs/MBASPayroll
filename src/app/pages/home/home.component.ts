import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElectronAPIService } from '../../services/electronAPIService';
import { InputFile } from '../../models/InputFile';
import { FileProcessingService } from '../../services/fileProcessingService';
import { OutputFile } from '../../models/OutputFile';
import { DateRangePickerComponent } from '../../shared/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, DateRangePickerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' //,
})

export class HomeComponent implements OnInit {

  inputFile: InputFile | undefined;
  outputFile: OutputFile | undefined
  selectedDateRange?: string;
  outputFormat: any = 'csv'; // Default output format
  outputFormats: string[] = ['csv']; // Add more formats as needed


  //Inject Services
  constructor(private electronAPIService: ElectronAPIService, private fileProcessingService: FileProcessingService) { }

  ngOnInit(): void {

  }

  onRangeSelected($event: any) {
    console.log($event);
    this.selectedDateRange = $event?.target?.value ?? $event;
  } 

  async selectFile() {
    this.inputFile = await this.electronAPIService.selectFile();
  }

  async saveFile() {
    if (!this.outputFile) {
      console.error("No output file to save.");
      return;
    }

    await this.electronAPIService.saveFile(this.outputFile.FileName, this.outputFile.Data);
  }

  async processFile() {
    if (!this.inputFile) {
      console.error("No input file selected.");
      return;
    }
    this.outputFile = this.fileProcessingService.processFile(this.selectedDateRange, this.outputFormat, this.inputFile.Data);

    await this.saveFile();
  }
}
