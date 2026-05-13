import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {

  carrinho: any[] = [];

  constructor(
    private pedidosService: PedidosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  }

  aumentarQuantidade(item: any) {
    item.quantidade++;
    this.salvarCarrinho();
  }

  diminuirQuantidade(item: any) {
    if (item.quantidade > 1) {
      item.quantidade--;
      this.salvarCarrinho();
    }
  }

  removerItem(index: number) {
    this.carrinho.splice(index, 1);
    this.salvarCarrinho();
  }

  private salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  finalizarCompra() {
    const pedido = {
      itens: this.carrinho.map(item => ({
        produto: item.nome,
        quantidade: item.quantidade,
        preco: item.preco
      })),
      total: this.calcularTotal(),
      status: 'pendente',
      data: new Date()
    };

    this.pedidosService.criarPedido(pedido).subscribe({
      next: () => {
        alert('Pedido realizado com sucesso!');
        this.carrinho = [];
        localStorage.removeItem('carrinho');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Erro ao finalizar pedido');
      }
    });
  }

  calcularTotal() {
    return this.carrinho.reduce(
      (acc, item) => acc + (item.preco * item.quantidade),
      0
    );
  }
}