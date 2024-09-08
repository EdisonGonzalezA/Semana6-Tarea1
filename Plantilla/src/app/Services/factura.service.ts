import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFactura } from '../Interfaces/ifactura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  apiurl = 'http://localhost/sexto/Clases/Clase5/controllers/factura.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IFactura[]> {
    return this.lector.get<IFactura[]>(this.apiurl + 'todos');
  }

  uno(idFactura: number): Observable<IFactura> {
    const formData = new FormData();
    formData.append('idFactura', idFactura.toString());
    return this.lector.post<IFactura>(this.apiurl + 'uno', formData);
  }

  eliminar(idFactura: number): Observable<number> {
    const formData = new FormData();
    formData.append('idFactura', idFactura.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(factura: IFactura): Observable<string> {
    const formData = new FormData();
    formData.append('Fecha', factura.Fecha);
    formData.append('Sub_Total', factura.Sub_Total.toString());
    formData.append('Sub_Total_IVA', factura.Sub_Total_IVA.toString());
    formData.append('Valor_IVA', factura.Valor_IVA.toString());
    formData.append('Cliente_idCliente', factura.Cliente_idCliente.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(factura: IFactura): Observable<string> {
    const formData = new FormData();
    formData.append('idFactura', factura.idFactura.toString());
    formData.append('Fecha', factura.Fecha);
    formData.append('Sub_Total', factura.Sub_Total.toString());
    formData.append('Sub_Total_IVA', factura.Sub_Total_IVA.toString());
    formData.append('Valor_IVA', factura.Valor_IVA.toString());
    formData.append('Cliente_idCliente', factura.Cliente_idCliente.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}