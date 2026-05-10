import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstoqueService } from './estoque.service';
import { RouterLink } from '@angular/router';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './estoque.html',
  styleUrls: ['./estoque.css']
})
export class Estoque implements OnInit {

  produtos: Produto[] = [];
  itensCarrinho: any[] = [];
  pedidos: any[] = [];

  novoProduto = {
    nome: '',
    categoria: '',
    preco: 0,
    estoque: 0
  };

  constructor(private estoqueservice: EstoqueService) { }

  ngOnInit() {
    this.listarTudo();
    this.carregarPedidos();
  }

  listarTudo() {
    this.estoqueservice.getProdutos().subscribe(res => this.produtos = res);
    this.estoqueservice.getCarrinho().subscribe(res => this.itensCarrinho = res);
  }

    carregarPedidos() {
    this.estoqueservice.getPedidos().subscribe(res => {
      this.pedidos = res;
    });
  }

  cadastrarProduto() {
    if (this.novoProduto.nome.trim() && this.novoProduto.preco > 0) {
      this.estoqueservice.cadastrar(this.novoProduto).subscribe(() => {
        this.limparFormulario();
        this.listarTudo();
      });
    }
  }

  limparFormulario() {
    this.novoProduto = {
      nome: '',
      categoria: '',
      preco: 0,
      estoque: 0
    };
  }

  alterarEstoque(produto: Produto, delta: number) {
    const novoEstoque = produto.estoque + delta;

    if (novoEstoque < 0) return;

    const atualizado = {
      ...produto,
      estoque: novoEstoque
    };

    this.estoqueservice.atualizarProduto(produto.id, atualizado)
      .subscribe(() => {
        produto.estoque = novoEstoque;
      });
  }

  remover(id: string) {
    this.estoqueservice.excluirProduto(id).subscribe(() => {
      this.listarTudo();
    });
  }

  getStatus(produto: Produto): string {
    return produto.estoque <= 5 ? 'Crítico' : 'Em dia';
  }
}