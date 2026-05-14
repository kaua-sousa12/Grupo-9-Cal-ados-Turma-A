import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EstoqueService } from '../estoque/estoque.service';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-configuracoes',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.css',
})
export class Configuracoes implements OnInit {
  usuarioLogado: any = null;
  quantidadeCarrinho = 0;
  pedidos: any[] = [];

  constructor(private router: Router, private apiService: ApiService,
    private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuario') || 'null');

    const carrinho = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    this.quantidadeCarrinho = carrinho.reduce(
      (total: number, item: any) => total + item.quantidade,
      0
    );
    this.carregarPedidos();
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.usuarioLogado = null;
    this.router.navigate(['/']);
  }

  carregarPedidos() {

    this.estoqueService
      .getPedidos()
      .subscribe(res => {

        this.pedidos = res;

      });
  }
}