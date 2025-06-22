import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000'; // Your Express API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Or use a service to get Firebase ID token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
