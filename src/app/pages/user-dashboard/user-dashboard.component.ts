import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  documents: any[] = [];
  currentUser: any;

  constructor(private api: ApiService) {
    const raw = localStorage.getItem('user');
    this.currentUser = raw ? JSON.parse(raw) : null;
  }

  ngOnInit(): void {
    if (this.currentUser?.id) {
      this.load();
    }
  }

  load() {
    this.api.getDocumentsForUser(this.currentUser.id)
      .subscribe(res => this.documents = res);
  }

  canApprove(doc: any): boolean {
    const idx = doc.currentIndex;
    const current = doc.approvers[idx];
    return doc.overallStatus !== 'Approved' &&
           current?.user?._id === this.currentUser.id &&
           current.status === 'Pending';
  }

  approve(doc: any) {
    this.api.approveDocument(doc._id, this.currentUser.id)
      .subscribe(() => this.load());
  }

  myStatus(doc: any): string {
    const a = doc.approvers.find((x: any) => x.user?._id === this.currentUser.id);
    return a?.status || 'Pending for approval';
  }
}
