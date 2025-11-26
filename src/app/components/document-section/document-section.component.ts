import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-document-section',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './document-section.component.html',
  styleUrl: './document-section.component.scss'
})
export class DocumentSectionComponent implements OnInit {
  approvedUsers: any[] = [];
  documents: any[] = [];

  docName = '';
  selectedApprovers: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadDocs();
  }

  loadUsers() {
    this.api.getUsers().subscribe(res => {
      this.approvedUsers = res.filter((u: any) => u.status === 'Approved');
    });
  }

  loadDocs() {
    this.api.getDocuments().subscribe(res => this.documents = res);
  }

  create() {
    if (!this.docName || !this.selectedApprovers.length) return;
    this.api.createDocument({
      name: this.docName,
      approverIds: this.selectedApprovers
    }).subscribe(() => {
      this.docName = '';
      this.selectedApprovers = [];
      this.loadDocs();
    });
  }
}
