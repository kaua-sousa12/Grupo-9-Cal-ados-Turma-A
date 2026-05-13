import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-feminino',
  imports: [FormsModule, RouterLink],
  templateUrl: './feminino.html',
  styleUrl: './feminino.css',
})
export class Feminino {
  carrinho: any[] = [];

  constructor(private pedidosService: PedidosService, private router: Router) {}
  ngOnInit(): void {
    const carrinhoSalvo = localStorage.getItem('carrinho');

    if(carrinhoSalvo){
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  } 
}
