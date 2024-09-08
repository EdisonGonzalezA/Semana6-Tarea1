import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIVA } from '../Interfaces/iiva';

@Injectable({
  providedIn: 'root'
})
export class IVAService {
  apiurl = 'http://localhost/sexto/Clases/Clase5/controllers/iva.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IIVA[]> {
    return this.lector.get<IIVA[]>(this.apiurl + 'todos');
  }

  uno(idIVA: number): Observable<IIVA> {
    const formData = new FormData();
    formData.append('idIVA', idIVA.toString());
    return this.lector.post<IIVA>(this.apiurl + 'uno', formData);
  }
}