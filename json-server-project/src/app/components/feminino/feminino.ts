import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { ApiService } from '../../services/api';
import { EstoqueService } from '../estoque/estoque.service';

@Component({
  selector: 'app-feminino',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './feminino.html',
  styleUrl: './feminino.css',
})
export class Feminino {
  usuarioLogado: any = null;
  quantidadeCarrinho = 0;
  pedidos: any[] = [];

  produtos = [
    {
      id: 8,
      nome: 'Nike Dunk F',
      preco: 699.90,
      imagem: 'assets/images/nike-dunk.webp'
    },
    {
      id: 9,
      nome: 'Puma RS-X F',
      preco: 599.90,
      imagem: 'assets/images/puma rs.webp'
    },
    {
      id: 10,
      nome: 'Puma 180 F',
      preco: 699.90,
      imagem: 'assets/images/puma-180.webp'
    }
  ];

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

  adicionarAoCarrinho(produto: any) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    const itemExistente = carrinho.find((item: any) => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    this.quantidadeCarrinho = carrinho.reduce(
      (total: number, item: any) => total + item.quantidade, 0
    );

    alert('Produto adicionado ao carrinho!');
  }
}
