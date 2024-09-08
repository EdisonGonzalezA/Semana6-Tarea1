import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IIVA } from 'src/app/Interfaces/iiva';
import { IProducto } from 'src/app/Interfaces/iproductos';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IVAService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  listaiva: IIVA[] = [];
  titulo = 'Nuevo Producto';
  frm_Producto: FormGroup;
  idProductos = 0;
  //ivaServicio: any;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaServicio: IVAService,
    private navegacion: Router,
    private productoServicio: ProductoService,
    private ruta: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaServicio.todos().subscribe((data) => (this.listaiva = data));

    //Inicializacion del formulario
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
    
    this.idProductos = parseInt(this.ruta.snapshot.paramMap.get('id') || '0');
    if (this.idProductos > 0) {
      this.crearFormulario();
    }
  }

  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.productoServicio.uno(this.idProductos).subscribe((producto) => {
      this.frm_Producto.patchValue({
        Codigo_Barras: producto.Codigo_Barras,
        Nombre_Producto: producto.Nombre_Producto,
        Graba_IVA: producto.Graba_IVA,
        Unidad_Medida_idUnidad_Medida: producto.Unidad_Medida_idUnidad_Medida,
        IVA_idIVA: producto.IVA_idIVA,
        Cantidad: producto.Cantidad,
        Valor_Compra: producto.Valor_Compra,
        Valor_Venta: producto.Valor_Venta,
        Proveedores_idProveedores: producto.Proveedores_idProveedores
      });
    });
    this.titulo = 'Editar Producto';
  }

  grabar() {
    let producto: IProducto = {
      idProductos: this.idProductos,
      Codigo_Barras: this.frm_Producto.get('Codigo_Barras')?.value,
      Nombre_Producto: this.frm_Producto.get('Nombre_Producto')?.value,
      Graba_IVA: this.frm_Producto.get('Graba_IVA')?.value,
      Unidad_Medida_idUnidad_Medida: this.frm_Producto.get('Unidad_Medida_idUnidad_Medida')?.value,
      IVA_idIVA: this.frm_Producto.get('IVA_idIVA')?.value,
      Cantidad: this.frm_Producto.get('Cantidad')?.value,
      Valor_Compra: this.frm_Producto.get('Valor_Compra')?.value,
      Valor_Venta: this.frm_Producto.get('Valor_Venta')?.value,
      Proveedores_idProveedores: this.frm_Producto.get('Proveedores_idProveedores')?.value
    };
  
    if (this.idProductos > 0 ) {
      // Actualización de producto existente
      this.productoServicio.actualizar(producto).subscribe(
        (respuesta) => {
          if (parseInt(respuesta) > 0) {
            this.frm_Producto.reset();  
            Swal.fire({
              title: 'Productos',
              text: 'Producto actualizado.',
              icon: 'success'
            }).then(() => {
              this.navegacion.navigate(['/productos']);
            });
          } else {
            alert("Error al actualizar el producto");
          }
        }
      );
      
    } else {
      // Inserción de nuevo producto
      this.productoServicio.insertar(producto).subscribe(
        (respuesta) => {
          if (parseInt(respuesta) > 1) {
            Swal.fire({
              title: 'Productos',
              text: 'Producto grabado.',
              icon: 'success'
            }).then(() => {
              this.navegacion.navigate(['/productos']);
            });
          } else {
            alert("Error al grabar el producto");
          }
      });
    }
  }

  cambio(objetoSlect: any) {
    let idIVA = objetoSlect.target.value;
    this.frm_Producto.get('IVA_idIVA')?.setValue(idIVA);
    let idProveedores = objetoSlect.target.value;
    this.frm_Producto.get('Proveedores_idProveedores')?.setValue(idProveedores);
  }
}