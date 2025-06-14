import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentType } from '../../models/enum/employmentType.enum';
import { Clinician } from '../../models/clinician';
import { InteractiveTableComponent, TableColumn } from '../../shared/interactive-table/interactive-table.component';
import { ElectronAPIService } from '../../services/electronAPIService';

@Component({
  selector: 'app-clinician-list',
  imports: [CommonModule, InteractiveTableComponent],
  templateUrl: './clinician-list.component.html',
  styleUrl: './clinician-list.component.css'
})
export class ClinicianListComponent implements OnInit {
  employees: Clinician[] = [];

  // Define the columns for the interactive table
  columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'text' },
    { key: 'text', label: 'Title', type: 'text' },
    { key: 'personalNumber', label: 'Personal Number', type: 'text' },
    { key: 'workNumber', label: 'Work Number', type: 'text' },
    { key: 'type', label: 'Employment Type', type: 'select', options: [EmploymentType.Employee, EmploymentType.Contractor] }
  ];

  constructor(private electronAPIService: ElectronAPIService) { }

  // Initialize the component and fetch employees from the database
  async ngOnInit() {
    this.employees = await this.electronAPIService.getEmployeesFromDb();
  }

  // Handle changes in the employee list from the interactive table
  async onEmployeesChange(updatedList: Clinician[]) {
    this.employees = updatedList;
    await this.electronAPIService.saveEmployeesToDb(this.employees);
  }
}
