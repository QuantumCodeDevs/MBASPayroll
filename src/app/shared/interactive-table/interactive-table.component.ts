import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElectronAPIService } from '../../services/electronAPIService';
import { ArrayUtils } from '../../utils/array-utils';
import { Clinician } from '../../models/clinician';

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'select';
  options?: any[]; // Only for select
}

@Component({
  selector: 'app-interactive-table',
  imports: [FormsModule, CommonModule],
  templateUrl: './interactive-table.component.html',
  styleUrl: './interactive-table.component.css'
})

export class InteractiveTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() name?: string;
  // @Input() columns: TableColumn[] = [];
  @Output() dataChange = new EventEmitter<any[]>();

  constructor(private electronAPIService: ElectronAPIService) { }

  columns: TableColumn[] = [];

  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedRowIndex: number | null = null;

  // Reference to the table element for click detection
  @ViewChild('tableRef', { static: true }) tableRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.tableRef?.nativeElement.contains(event.target)) {
      if (this.selectedRowIndex !== null) {
        this.dataChange.emit(this.data); // emit when editing finishes
      }
      this.selectedRowIndex = null;
    }
  }

  ngOnInit() {
    this.inferColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      this.inferColumns();
    }
  }

  //#region Column logic
  //Infer Columns from incoming data
  inferColumns() {
    console.log(this.data);
    if (this.data && this.data.length > 0) {
      this.columns = Object.keys(this.data[0]).map(key => ({
        key,
        label: key,
        type: 'text'
      }));
      console.log(this.columns);

      // Reset sortColumn if it doesn't exist in new columns
      if (!this.columns.some(col => col.key === this.sortColumn)) {
        this.sortColumn = '';
      }
    } else {
      this.columns = [];
      this.sortColumn = '';
    }
  }
  //#endregion

  //#region Row selection logic
  selectRow(i: number) {
    if (this.selectedRowIndex !== null && this.selectedRowIndex !== i) {
      this.dataChange.emit(this.data); // emit when switching rows
    }
    this.selectedRowIndex = i;
  }

  //TODO: Limit emitions to only when deselecting the row or deleting a row
  addRow() {
    const newRow: any = {};
    this.columns.forEach(col => {
      newRow[col.key] = col.type === 'select' && col.options?.length ? col.options[0] : '';
    });
    this.data.push(newRow);
    this.inferColumns(); // <-- Refresh columns
    this.selectedRowIndex = this.data.length - 1; // Select the new row for editing

    //Not working currently
    // Scroll to the new row vertically
    // setTimeout(() => {
    //   const tableElem = this.tableRef?.nativeElement as HTMLElement;
    //   if (tableElem) {
    //     const rowElems = tableElem.querySelectorAll('tr');
    //     const newRowElem = rowElems[rowElems.length - 1] as HTMLElement;
    //     if (newRowElem) {
    //       newRowElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    //     }
    //   }
    // }, 0);
    // this.dataChange.emit(this.data);
  }

  deleteRow(index: number) {
    this.data.splice(index, 1);
    this.inferColumns(); // <-- Refresh columns
    this.dataChange.emit(this.data); // emit immediately on delete
    // Optionally, deselect if the deleted row was selected
    if (this.selectedRowIndex === index) {
      this.selectedRowIndex = null;
    }
  }
  //#endregion

  //#region Sorting and Filtering logic
  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  filteredData(): any[] {
    let filtered = this.data;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(row =>
        this.columns.some(col =>
          (row[col.key] || '').toString().toLowerCase().includes(term)
        )
      );
    }
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[this.sortColumn];
        let bValue = b[this.sortColumn];
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
  //#endregion

  //UploadClinicianList
  async uploadCSVList() {
    var file = await this.electronAPIService.selectFile();
    if (!file.Data) {
      throw new Error('data is undefined');
    }

    this.data = ArrayUtils.mapInputDataToArray<Clinician>(file.Data);
    this.dataChange.emit(this.data); // emit when editing finishes
  }
}
