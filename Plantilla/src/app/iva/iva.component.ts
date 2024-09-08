import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { IIVA } from '../Interfaces/iiva';
import { IVAService } from '../Services/iva.service';

@Component({
  selector: 'app-iva',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './iva.component.html',
  styleUrl: './iva.component.scss'
})
export class IvaComponent implements OnInit{
  listaiva: IIVA[] = [];

  constructor(private ivaServicio: IVAService) {}
  ngOnInit(): void {
    this.ivaServicio.todos().subscribe((data) => {
      this.listaiva = data;
    });
  }

  trackByFn() {}

  eliminar(idIVA: number) {}

}
