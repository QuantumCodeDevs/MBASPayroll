import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() hover: boolean = false; // New input to control behavior

  hovered = false;
  show = false;

  constructor(private eRef: ElementRef) {}

  // For hover mode
  onMouseEnter() {
    if (this.hover) this.hovered = true;
  }
  onMouseLeave() {
    if (this.hover) this.hovered = false;
  }

  toggleTooltip(event: MouseEvent) {
    event.stopPropagation();
    this.show = !this.show;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }
}