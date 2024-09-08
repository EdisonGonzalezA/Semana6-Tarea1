export interface IFactura {
    idFactura?: number;
    Fecha: string;
    Sub_Total: number;
    Sub_Total_IVA: number;
    Valor_IVA: number;
    Cliente_idCliente: number;
  
    //son solo para mostrar informacion
    Nombres?: string;
    total?: number;
}