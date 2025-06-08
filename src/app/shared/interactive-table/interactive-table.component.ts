import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { Employment } from '../../models/enum/employment.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interactive-table',
  imports: [FormsModule, CommonModule],
  templateUrl: './interactive-table.component.html',
  styleUrl: './interactive-table.component.css'
})
export class InteractiveTableComponent {
  @Input() employees: Employee[] = [];
  @Output() employeesChange = new EventEmitter<Employee[]>();

  Employment = Employment;

  addRow() {
    this.employees.push({ firstName: '', lastName: '', personalNumber: '', workNumber: '', type: Employment.Employee });
    this.employeesChange.emit(this.employees);
  }

  deleteRow(index: number) {
    this.employees.splice(index, 1);
    this.employeesChange.emit(this.employees);
  }

  onFieldChange() {
    this.employeesChange.emit(this.employees);
  }
}
