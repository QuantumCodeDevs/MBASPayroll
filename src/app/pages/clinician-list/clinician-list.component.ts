import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Clinician } from '../../models/ExcelData';
import { Employment } from '../../models/enum/employment.enum';

@Component({
  selector: 'app-clinician-list',
  imports: [CommonModule],
  templateUrl: './clinician-list.component.html',
  styleUrl: './clinician-list.component.css'
})
export class ClinicianListComponent {
  //clinicians: Clinician[] = [];

  ngOnInit() {
    // this.clinicians = [
    //   //Example
    //   // {firstName: 'Kenny', lastName: 'Lamb', type: Employment.Contractor},
    //   // {firstName: 'John', lastName: 'Doe', type: Employment.Employee}
    // ];

    //Fill from local storage

  }
}
