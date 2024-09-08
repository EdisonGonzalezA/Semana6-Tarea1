import { Component, OnInit } from '@angular/core';
import { IUnidadMedida } from '../Interfaces/iunidadmedida';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { UnidadmedidaService } from '../Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent implements OnInit {
  listaunidades: IUnidadMedida[] = [];

  constructor(private unidadServicio: UnidadmedidaService) {}
  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.unidadServicio.todos().subscribe((data) => {      
      this.listaunidades = data;
      console.log(data);
    });
  }

    eliminar(idUnidad_Medida: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la unidad de medida',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.unidadServicio.eliminar(idUnidad_Medida).subscribe((respuesta) => {
            Swal.fire('Eliminado', 'La unidad de medida ha sido eliminada', 'success');
            this.cargarTabla();
          });
        } (error) => {
          Swal.fire('Error', 'No se pudo eliminar la unidad de medida', 'error');
        }
      });
    }
}
