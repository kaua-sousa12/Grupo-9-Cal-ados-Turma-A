import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-gestao-marcas',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './gestao-marcas.html',
  styleUrl: './gestao-marcas.css',
})
export class GestaoMarcas {}
