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
  searchTerm: any;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

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

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  filteredEmployees(): Employee[] {
    let filtered = this.employees;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(emp =>
        (emp.firstName || '').toLowerCase().includes(term) ||
        (emp.lastName || '').toLowerCase().includes(term)
      );
    }
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[this.sortColumn as keyof Employee];
        let bValue = b[this.sortColumn as keyof Employee];
        if (this.sortColumn === 'index') {
          aValue = this.employees.indexOf(a);
          bValue = this.employees.indexOf(b);
        }
        if (aValue == null) aValue = '';
        if (bValue == null) bValue = '';
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return this.sortDirection === 'asc'
          ? (aValue as any) - (bValue as any)
          : (bValue as any) - (aValue as any);
      });
    }
    return filtered;
  }
}
