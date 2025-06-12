import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElectronAPIService } from '../../services/electronAPIService';
import { InputFile } from '../../models/inputFile';
import { FileProcessingService } from '../../services/fileProcessingService';
import { OutputFile } from '../../models/outputFile';
import { DateRangePickerComponent } from '../../shared/date-range-picker/date-range-picker.component';
import { ToastService } from '../../services/toast.service';
import { ToastMessage } from '../../models/toastmessage';

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
  constructor(private electronAPIService: ElectronAPIService, private fileProcessingService: FileProcessingService, private toast: ToastService) { }

  ngOnInit(): void {

  }

  onRangeSelected($event: any) {
    this.selectedDateRange = $event?.target?.value ?? $event;
  }

  async selectFile() {
    try {
      this.inputFile = await this.electronAPIService.selectFile();

    } catch (error) {
      console.error('Error selecting file:', error);
      this.toast.show(new ToastMessage({
        text: 'Error selecting file. Please check the console for details.',
        type: 'error',
      }));
      return;
    }
  }

  async saveFile() {
    try {
      if (!this.outputFile) {
        this.toast.show(new ToastMessage({
          text: 'No output file to save. Error processing file.',
          type: 'error',
        }));
        return;
      }

      var result = await this.electronAPIService.saveFile(this.outputFile.FileName, this.outputFile.Data);


      if (result.success) {
        this.toast.show(new ToastMessage({
          text: `File saved successfully as ${this.outputFile.FileName}.`,
          type: 'success',
        }));
      } else {
        this.toast.show(new ToastMessage({
          text: result.message ?? 'An unknown error occurred.',
          type: 'error',
        }));
      }
    } catch (error) {
      console.error('Error saving file:', error);
      this.toast.show(new ToastMessage({
        text: 'Error saving file. Please check the console for details.',
        type: 'error',
      }));
      return;
    }
  }

  async processFile() {
    try {
      if (!this.selectedDateRange) {
        this.toast.show(new ToastMessage({
          text: 'Please select a date range first.',
          type: 'error',
        }));
        return;
      }

      if (!this.inputFile) {
        this.toast.show(new ToastMessage({
          text: 'Please select an input file first.',
          type: 'error',
        }));
        return;
      }

      this.outputFile = this.fileProcessingService.processFile(this.selectedDateRange, this.outputFormat, this.inputFile.Data);

      await this.saveFile();
    } catch (error) {
      console.error('Error processing file:', error);
      this.toast.show(new ToastMessage({
        text: 'Error processing file. Please check the console for details.',
        type: 'error',
      }));
      return;
    }
  }
}
