import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploymentType } from '../../models/enum/employmentType.enum';
import { Clinician } from '../../models/clinician';
import { InteractiveTableComponent, TableColumn } from '../../shared/interactive-table/interactive-table.component';
import { ElectronAPIService } from '../../services/electronAPIService';
import { ArrayUtils } from '../../utils/array-utils';

@Component({
  selector: 'app-clinician-list',
  imports: [CommonModule, InteractiveTableComponent],
  templateUrl: './clinician-list.component.html',
  styleUrl: './clinician-list.component.css'
})
export class ClinicianListComponent implements OnInit {
  employees: Clinician[] = [];
  title = 'Clinician Management';

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
