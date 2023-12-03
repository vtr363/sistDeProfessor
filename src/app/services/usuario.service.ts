import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/usuarios'

  adicionarProfessor(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  atualizarProfessor(id: number, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }

  getProfessorList(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  deletarProfessor(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

}