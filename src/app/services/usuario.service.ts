import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiUrl = 'http://localhost:3000/professores';

  constructor(private http: HttpClient) {}

  adicionarProfessor(professor: any): Observable<any> {
    return this.http.post(this.apiUrl, professor);
  }

}