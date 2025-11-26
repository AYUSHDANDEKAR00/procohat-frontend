import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  @Output() statsChange = new EventEmitter<{total:number;pending:number}>();

  users: any[] = [];
  pending: any[] = [];
  newUser = { username: '', email: '', role: 'approver' };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
      const total = this.users.length;
      const pendingCount = this.users.filter(u => u.status === 'Pending').length;
      this.statsChange.emit({ total, pending: pendingCount });
    });
    this.api.getPendingUsers().subscribe(res => this.pending = res);
  }

  createUser() {
    this.api.createUser(this.newUser).subscribe(() => {
      this.newUser = { username: '', email: '', role: 'approver' };
      this.refresh();
    });
  }

  approve(u: any) {
    this.api.approveUser(u._id).subscribe(() => this.refresh());
  }

  reject(u: any) {
    const reason = prompt('Rejection reason?') || '';
    if (!reason) return;
    this.api.rejectUser(u._id, reason).subscribe(() => this.refresh());
  }
}
