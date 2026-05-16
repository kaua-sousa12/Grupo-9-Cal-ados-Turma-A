import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EstoqueService } from '../estoque/estoque.service';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.css',
})
export class Configuracoes implements OnInit {
  novoNome = '';
  mostrarEditarConta = false;
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

        this.pedidos = res.filter(
          (pedido: any) =>
            pedido.usuarioId === this.usuarioLogado?.id
        );

      });
  }

  salvarDadosPessoais() {

    const dadosPessoais = {

      nome: this.usuarioLogado.nome,
      cpf: this.usuarioLogado.cpf,
      dataNascimento: this.usuarioLogado.dataNascimento,
      telefone: this.usuarioLogado.telefone,
      genero: this.usuarioLogado.genero

    };

    this.apiService
      .atualizarUsuario(
        this.usuarioLogado.id,
        dadosPessoais
      )
      .subscribe(() => {

        Object.assign(
          this.usuarioLogado,
          dadosPessoais
        );

        localStorage.setItem(
          'usuario',
          JSON.stringify(this.usuarioLogado)
        );

        alert('Dados pessoais atualizados!');

      });

  }

  salvarEndereco() {

    const endereco = {

      rua: this.usuarioLogado.rua,
      numero: this.usuarioLogado.numero,
      bairro: this.usuarioLogado.bairro,
      cidade: this.usuarioLogado.cidade,
      estado: this.usuarioLogado.estado,
      cep: this.usuarioLogado.cep

    };

    this.apiService
      .atualizarUsuario(
        this.usuarioLogado.id,
        endereco
      )
      .subscribe(() => {

        Object.assign(
          this.usuarioLogado,
          endereco
        );

        localStorage.setItem(
          'usuario',
          JSON.stringify(this.usuarioLogado)
        );

        alert('Endereço atualizado!');

      });

  }
  salvarNome() {

  const dados = {

    nome: this.novoNome

  };

  this.apiService
    .atualizarUsuario(
      this.usuarioLogado.id,
      dados
    )
    .subscribe(() => {

      this.usuarioLogado.nome = this.novoNome;

      localStorage.setItem(
        'usuario',
        JSON.stringify(this.usuarioLogado)
      );

      alert('Nome atualizado com sucesso!');

      this.fecharEditarConta();

    });

}

abrirEditarConta() {

  this.novoNome = this.usuarioLogado.nome;

  this.mostrarEditarConta = true;

}

  fecharEditarConta() {

    this.mostrarEditarConta = false;

  }
}