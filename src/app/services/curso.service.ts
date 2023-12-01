import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../modelos/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  obterCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }
}