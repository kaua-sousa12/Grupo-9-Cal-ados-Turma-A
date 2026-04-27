import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

interface ItemCarrinho {
  id: string;
  produtoId: string;
  quantidade: number;
  status: string;
  data: string;
}

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './estoque.html',
  styleUrl: './estoque.css'
})
export class Estoque implements OnInit {

  produtos: Produto[] = [];
  carrinho: ItemCarrinho[] = [];

  private apiUrl = 'http://localhost:3000/produtos';
  private apiCarrinho = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarProdutos();
    this.carregarCarrinho();
  }

  carregarProdutos() {
    this.http.get<Produto[]>(this.apiUrl).subscribe(dados => {
      this.produtos = dados;
    });
  }

  alterarEstoque(produto: Produto, delta: number) {
    const novoEstoque = produto.estoque + delta;
    if (novoEstoque < 0) return; 

    this.http.patch<Produto>(`${this.apiUrl}/${produto.id}`, { estoque: novoEstoque })
      .subscribe(() => {
        produto.estoque = novoEstoque; 
      });
  }

  getStatus(produto: Produto): string {
    return produto.estoque <= 5 ? 'Crítico' : 'Em dia';
  }

  carregarCarrinho() {
    this.http.get<ItemCarrinho[]>(this.apiCarrinho)
      .subscribe(dados => {
        this.carrinho = dados;
      });
  }

  adicionarAoCarrinho(produto: Produto, quantidade: number) {
    if (!quantidade || quantidade <= 0) {
      alert("Quantidade inválida!");
      return;
    }

    if (produto.estoque < quantidade) {
      alert(`Estoque insuficiente! Disponível: ${produto.estoque}`);
      return;
    }

    const novoEstoque = produto.estoque - quantidade;

    this.http.patch(`${this.apiUrl}/${produto.id}`, {
      estoque: novoEstoque
    }).subscribe(() => {

      produto.estoque = novoEstoque;

      this.http.post(this.apiCarrinho, {
        produtoId: produto.id,
        quantidade,
        status: "reservado",
        data: new Date().toISOString()
      }).subscribe(() => {

        alert("✅ Produto adicionado ao carrinho!");
        this.carregarCarrinho();
      });

    });
  }

  deletarDoCarrinho(item: ItemCarrinho) {
    if (item.status === "confirmado") {
      alert("Não pode excluir item já comprado!");
      return;
    }

    this.http.get<Produto>(`${this.apiUrl}/${item.produtoId}`)
      .subscribe(produto => {

        const novoEstoque = produto.estoque + item.quantidade;

        this.http.patch(`${this.apiUrl}/${produto.id}`, {
          estoque: novoEstoque
        }).subscribe(() => {

          this.http.delete(`${this.apiCarrinho}/${item.id}`)
            .subscribe(() => {

              alert("Removido!");
              this.carregarProdutos();
              this.carregarCarrinho();

            });

        });

      });
  }

  finalizarCompra() {
    this.carrinho.forEach(item => {
      this.http.patch(`${this.apiCarrinho}/${item.id}`, {
        status: "confirmado"
      }).subscribe();
    });

    alert("Compra finalizada!");
    this.carregarCarrinho();
  }
}