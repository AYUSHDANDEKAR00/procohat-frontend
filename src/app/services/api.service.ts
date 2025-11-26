import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({ providedIn: 'root' })
export class ApiService {
 private base = environment.apiBase;

  constructor(private http: HttpClient) {}


  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/items`);
  }
  addItem(body: any): Observable<any> {
    return this.http.post<any>(`${this.base}/items`, body);
  }
  updateItem(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.base}/items/${id}`, body);
  }
  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.base}/items/${id}`);
  }

  
  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.base}/auth/login`, body);
  }


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/users`);
  }
  getPendingUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/users/pending`);
  }
  createUser(body: any): Observable<any> {
    return this.http.post<any>(`${this.base}/users`, body);
  }
  approveUser(id: string): Observable<any> {
    return this.http.post<any>(`${this.base}/users/${id}/approve`, {});
  }
  rejectUser(id: string, reason: string): Observable<any> {
    return this.http.post<any>(`${this.base}/users/${id}/reject`, { reason });
  }

  
  createDocument(body: any): Observable<any> {
    return this.http.post<any>(`${this.base}/documents`, body);
  }
  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/documents`);
  }
  getDocumentsForUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/documents/for-user/${userId}`);
  }
  approveDocument(docId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.base}/documents/${docId}/approve`, { userId });
  }



  uploadGallery(fd: FormData) {
  return this.http.post(`${this.base}/gallery`, fd);
}

getGallery() {
  return this.http.get(`${this.base}/gallery`);
}

}
