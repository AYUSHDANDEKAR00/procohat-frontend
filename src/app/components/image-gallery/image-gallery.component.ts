import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [NgIf],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  gallery: any;
  files: File[] = [];
  preview1: any;
  preview2: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.getGallery().subscribe(res => {
      this.gallery = res;
    });
  }

  onChange(event: any) {
    const list = event.target.files as FileList;
    this.files = Array.from(list).slice(0, 2);

    if (this.files[0]) this.preview1 = URL.createObjectURL(this.files[0]);
    if (this.files[1]) this.preview2 = URL.createObjectURL(this.files[1]);
  }

  upload() {
    if (this.files.length === 0) {
      alert("Please select 2 images");
      return;
    }

    const fd = new FormData();
    this.files.forEach(f => fd.append("images", f));

    this.api.uploadGallery(fd).subscribe(res => {
      this.gallery = res;
      this.preview1 = null;
      this.preview2 = null;
      this.files = [];
      alert("Gallery updated!");
    });
  }
}
