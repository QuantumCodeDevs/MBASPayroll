import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElectronAPIService } from '../../services/electronAPIService';
import { InputFile } from '../../models/InputFile';
import { FileProcessingService } from '../../services/fileProcessingService';
import { OutputFile } from '../../models/OutputFile';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' //,
  //encapsulation: ViewEncapsulation.None, // <-- Disable encapsulation

})

export class HomeComponent implements OnInit {
  inputFile: InputFile | undefined;
  outputFile: OutputFile | undefined
  selectedDate?: Date;

  //Inject Services
  constructor(private electronAPIService: ElectronAPIService, private fileProcessingService: FileProcessingService) { }

  ngOnInit(): void {

  }

  async selectFile() {
    this.inputFile = await this.electronAPIService.selectFile();
  }

  async saveFile() {
    await this.electronAPIService.saveFile(`${this.selectedDate}${this.outputFile?.FileName}`, this.outputFile?.Data);
  }

  async processFile() {
    if (this.inputFile != null) {
      this.outputFile = this.fileProcessingService.processFile(this.selectedDate, this.inputFile);
      
      await this.saveFile();
    }
  }
}
