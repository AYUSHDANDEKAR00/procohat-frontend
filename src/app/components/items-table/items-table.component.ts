import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-items-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent implements OnInit {
  items: any[] = [];
  showModal = false;
  editing = false;
  editingId: string | null = null;

  form: any = { title: '', description: '', amount: null };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getItems().subscribe(res => this.items = res);
  }

  openAdd() {
    this.editing = false;
    this.editingId = null;
    this.form = { title: '', description: '', amount: null };
    this.showModal = true;
  }

  openEdit(item: any) {
    this.editing = true;
    this.editingId = item._id;
    this.form = { title: item.title, description: item.description, amount: item.amount };
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  save() {
    if (this.editing && this.editingId) {
      this.api.updateItem(this.editingId, this.form).subscribe(() => {
        this.close();
        this.load();
      });
    } else {
      this.api.addItem(this.form).subscribe(() => {
        this.close();
        this.load();
      });
    }
  }

  remove(item: any) {
    if (!confirm('Delete this row?')) return;
    this.api.deleteItem(item._id).subscribe(() => this.load());
  }
}
