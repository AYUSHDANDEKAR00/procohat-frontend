import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ItemsTableComponent } from '../../components/items-table/items-table.component';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { AdminUsersComponent } from '../../components/admin-users/admin-users.component';
import { DocumentSectionComponent } from '../../components/document-section/document-section.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    ItemsTableComponent,
    ImageGalleryComponent,
    AdminUsersComponent,
    DocumentSectionComponent,
    NgIf
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  tab: 'table' | 'gallery' | 'users' | 'documents' = 'table';
  stats = { total: 0, pending: 0 };

  onStatsChange(s: any) {
    this.stats = s;
  }
}
