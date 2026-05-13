import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historico.html',
  styleUrls: ['./historico.css']
})
export class Historico implements OnInit {

  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.listarPedidos().subscribe({
      next: (dados) => {
        this.pedidos = dados.reverse();
      },
      error: () => alert('Erro ao carregar histórico')
    });
  }

  listarProdutos(itens: any[]): string {
    return itens.map(i => i.produto).join(', ');
  }

  totalItens(itens: any[]): number {
    return itens.reduce((acc, i) => acc + i.quantidade, 0);
  }

  formatarData(dataISO: string): string {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}