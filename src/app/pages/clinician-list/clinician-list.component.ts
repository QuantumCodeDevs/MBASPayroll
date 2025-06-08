import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employment } from '../../models/enum/employment.enum';
import { Employee } from '../../models/employee';
import { InteractiveTableComponent } from '../../shared/interactive-table/interactive-table.component';
import { ElectronAPIService } from '../../services/electronAPIService';

@Component({
  selector: 'app-clinician-list',
  imports: [CommonModule, InteractiveTableComponent],
  templateUrl: './clinician-list.component.html',
  styleUrl: './clinician-list.component.css'
})
export class ClinicianListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private electronAPIService: ElectronAPIService) { }

  async ngOnInit() {

    this.employees = await this.electronAPIService.getEmployeesFromDb();
  }

  async onEmployeesChange(updatedList: Employee[]) {
    this.employees = updatedList;
    await this.electronAPIService.saveEmployeesToDb(this.employees);
  }
}
