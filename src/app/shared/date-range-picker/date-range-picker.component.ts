import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  ViewChild,
  output,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
})
export class DateRangePickerComponent implements OnInit, OnDestroy {
  @Input() rangeLength: number = 14; // Default range length of 14 days
  @Output() dateRangeSelected = new EventEmitter<string>(); // Emit selected date range in format 'mm/dd/yyyy_mm/dd/yyyy'

  @ViewChild('inputField', { static: true }) inputField!: ElementRef<HTMLInputElement>;

  showCalendar = false;
  displayedMonth!: number;
  displayedYear!: number;

  startDate: Date | null = null;
  hoverDate: Date | null = null;

  calendarDays: (Date | null)[] = [];
  selectedRange: any = 'mm/dd/yyyy_mm/dd/yyyy'; // default format

  ngOnInit() {
    console.log('DateRangePickerComponent initialized');
    const now = new Date();
    this.displayedMonth = now.getMonth();
    this.displayedYear = now.getFullYear();
    this.generateCalendar();
  }

  ngOnDestroy() {
    console.log('DateRangePickerComponent destroyed');
  }

  // Toggle calendar visibility and reset start date
  toggleCalendar() {
    this.startDate = null; // Reset start date when toggling calendar
    this.showCalendar = !this.showCalendar;
  }

  generateCalendar() {
    this.calendarDays = [];

    const firstDayOfMonth = new Date(this.displayedYear, this.displayedMonth, 1);
    const startWeekday = firstDayOfMonth.getDay();

    const daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();

    // add empty slots before first day
    for (let i = 0; i < startWeekday; i++) {
      this.calendarDays.push(null);
    }

    // add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(new Date(this.displayedYear, this.displayedMonth, day));
    }
  }

  prevMonth() {
    if (this.displayedMonth === 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else {
      this.displayedMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.displayedMonth === 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    } else {
      this.displayedMonth++;
    }
    this.generateCalendar();
  }

  selectDate(date: Date | null) {
    if (!date) return;
    this.startDate = date;
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + this.rangeLength - 1);
    this.selectedRange = `${this.formatDate(this.startDate)}_${this.formatDate(endDate)}`;
    this.inputField.nativeElement.value = this.selectedRange;
    this.showCalendar = false;
    console.log('Selected Range:', this.selectedRange);
    this.dateRangeSelected.emit(this.selectedRange);
  }

  formatDate(date: Date) {
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return `${mm}-${dd}-${yyyy}`;
  }

  isInRange(date: Date | null): boolean {
    if (!date || !this.startDate) return false;
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + this.rangeLength - 1);
    return date >= this.startDate && date <= endDate;
  }

  isInHoverRange(date: Date | null): boolean {
    if (!date) return false;
    if (this.hoverDate && !this.startDate) {
      // If no startDate, just highlight hovered date range from hovered date
      const endDate = new Date(this.hoverDate);
      endDate.setDate(endDate.getDate() + this.rangeLength - 1);
      return date >= this.hoverDate && date <= endDate;
    }
    if (!this.startDate || !this.hoverDate) return false;
    // Hover preview from startDate to hoveredDate if hoveredDate after startDate
    if (this.hoverDate >= this.startDate) {
      return date >= this.startDate && date <= this.hoverDate;
    } else {
      return date >= this.hoverDate && date <= this.startDate;
    }
  }

  // Close calendar when clicked outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.showCalendar &&
      !this.inputField.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('.calendar-popup')
    ) {
      this.showCalendar = false;
      this.hoverDate = null;
    }
  }
}
