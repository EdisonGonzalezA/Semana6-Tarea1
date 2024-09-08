import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevoiva',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoiva.component.html',
  styleUrl: './nuevoiva.component.scss'
})
export class NuevoivaComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
