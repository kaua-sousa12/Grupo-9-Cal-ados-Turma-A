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

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './estoque.html',
  styleUrl: './estoque.css'
})
export class Estoque implements OnInit {
  produtos: Produto[] = [];
 private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarProdutos();
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
}