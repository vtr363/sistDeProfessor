import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  adicionarProfessor(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/professores', data);
  }

  atualizarProfessor(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/professores/${id}`, data);
  }

  getProfessorList(): Observable<any> {
    return this._http.get('http://localhost:3000/professores');
  }

  deletarProfessor(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/professores/${id}`);
  }

}