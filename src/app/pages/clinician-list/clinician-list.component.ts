import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employment } from '../../models/enum/employment.enum';
import { Employee } from '../../models/employee';
import { InteractiveTableComponent, TableColumn } from '../../shared/interactive-table/interactive-table.component';
import { ElectronAPIService } from '../../services/electronAPIService';

@Component({
  selector: 'app-clinician-list',
  imports: [CommonModule, InteractiveTableComponent],
  templateUrl: './clinician-list.component.html',
  styleUrl: './clinician-list.component.css'
})
export class ClinicianListComponent implements OnInit {
  employees: Employee[] = [];

  // Define the columns for the interactive table
  columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'lastName', label: 'Last Name', type: 'text' },
    { key: 'text', label: 'Title', type: 'text' },
    { key: 'personalNumber', label: 'Personal Number', type: 'text' },
    { key: 'workNumber', label: 'Work Number', type: 'text' },
    { key: 'type', label: 'Employment Type', type: 'select', options: [Employment.Employee, Employment.Contractor] }
  ];

  constructor(private electronAPIService: ElectronAPIService) { }

  // Initialize the component and fetch employees from the database
  async ngOnInit() {
    this.employees = await this.electronAPIService.getEmployeesFromDb();
  }

  // Handle changes in the employee list from the interactive table
  async onEmployeesChange(updatedList: Employee[]) {
    this.employees = updatedList;
    await this.electronAPIService.saveEmployeesToDb(this.employees);
  }
}
