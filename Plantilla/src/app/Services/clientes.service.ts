import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icliente } from '../Interfaces/icliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiurl = 'http://localhost/sexto/Clases/Clase5/controllers/clientes.controller.php?op=';
  constructor(private lector: HttpClient) { }

  buscar(texto: string): Observable<Icliente> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<Icliente>(this.apiurl + 'uno', formData);
  }

  todos():Observable<Icliente[]>{
    return this.lector.get<Icliente[]>(this.apiurl + 'todos');
  }
  uno(idClientes: number):Observable<Icliente>{
    const formData = new FormData();
    formData.append('idClientes', idClientes.toString());
    return this.lector.post<Icliente>(this.apiurl + 'uno', formData);
  } 
   insertar(cliente: Icliente):Observable<string>{
    const formData = new FormData();
    formData.append('Nombres', cliente.Nombres);
    formData.append('Direccion', cliente.Direccion);
    formData.append('Telefono', cliente.Telefono);
    formData.append('Cedula', cliente.Cedula);
    formData.append('Correo', cliente.Correo);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(cliente: Icliente):Observable<string>{
    const formData = new FormData();
    formData.append('idClientes', cliente.idClientes.toString());
    formData.append('Nombres', cliente.Nombres);
    formData.append('Direccion', cliente.Direccion);
    formData.append('Telefono', cliente.Telefono);
    formData.append('Cedula', cliente.Cedula);
    formData.append('Correo', cliente.Correo);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
  eliminar(idClientes: number):Observable<number>{
    const formData = new FormData();
    formData.append('idClientes', idClientes.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
}
