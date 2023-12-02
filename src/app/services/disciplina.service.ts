import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from '../modelos/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  constructor(private _http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/disciplinas';

  adicionarDisciplina(data: Disciplina): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  atualizarDisciplina(id: number, data: Disciplina): Observable<any> {
    return this._http.put<Disciplina>(`${this.apiUrl}/${id}`, data);
  }

  getDisciplinaList(): Observable<any> {
    return this._http.get<Disciplina[]>(this.apiUrl);
  }

  deletarDisciplina(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
