import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Usuario } from '../../models/models';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  quantidadeCarrinho = 0;
  newUsuario: Usuario = { nome: '', email: '', telefone: '', profissao: '' };
  constructor(private apiService: ApiService) { }
  ngOnInit(): void { this.loadUsuarios(); }
  loadUsuarios(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getUsuarios().subscribe({
      next: (data) => { this.usuarios = data; this.loading = false; },
      error: (err) => {
        this.error = 'Erro ao carregar usuários. Certifique-se de que o JSON Server está rodando.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  onSubmit(): void {
    if (!this.newUsuario.nome || !this.newUsuario.email ||
      !this.newUsuario.telefone || !this.newUsuario.profissao) { return; }

    this.apiService.createUsuario(this.newUsuario).subscribe({
      next: () => {
        this.successMessage = 'Usuário criado com sucesso!';
        this.newUsuario = { nome: '', email: '', telefone: '', profissao: '' };
        this.loadUsuarios();
      },
      error: (err) => {
        this.error = 'Erro ao criar usuário';
        console.error(err);
      }
    });
  }
  adicionarAoCarrinho(produto: any) {

    const carrinho = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    const itemExistente = carrinho.find(
      (item: any) => item.id === produto.id
    );

    if (itemExistente) {

      itemExistente.quantidade++;

    } else {

      carrinho.push({
        ...produto,
        quantidade: 1
      });

    }

    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho)
    );

    this.quantidadeCarrinho = carrinho.reduce(
      (total: number, item: any) =>
        total + item.quantidade,
      0
    );

    alert('Produto adicionado ao carrinho!');
  }
  carregarPedidos() {

    this.estoqueService
      .getPedidos()
      .subscribe(res => {

        this.pedidos = res;

      });
  }

}

