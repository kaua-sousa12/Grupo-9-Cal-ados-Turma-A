import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-vendas-por-marca',
  imports: [FormsModule, RouterLink],
  templateUrl: './vendas-por-marca.html',
  styleUrl: './vendas-por-marca.css',
})
export class VendasPorMarca {}
