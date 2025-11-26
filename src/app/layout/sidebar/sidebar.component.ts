import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

export type AdminTab = 'table' | 'gallery' | 'users' | 'documents';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  @Input() tab: AdminTab = 'table';
  @Output() tabChangeEvent = new EventEmitter<AdminTab>();

  change(tab: AdminTab) {
    this.tabChangeEvent.emit(tab);
  }
}
