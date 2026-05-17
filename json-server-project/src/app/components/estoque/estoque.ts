import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class Estoque implements OnInit, OnDestroy {

  produtos: Produto[] = [];
  itensCarrinho: any[] = [];
  pedidos: any[] = [];
  intervaloPedidos: any;

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

    this.intervaloPedidos = setInterval(() => {
      this.carregarPedidos();
    }, 2000);

  }

  ngOnDestroy() {
    clearInterval(this.intervaloPedidos);
  }

  listarTudo() {

    this.estoqueservice
      .getProdutos()
      .subscribe(res => this.produtos = res);

    this.estoqueservice
      .getCarrinho()
      .subscribe(res => this.itensCarrinho = res);

  }

  carregarPedidos() {

    this.estoqueservice
      .getPedidos()
      .subscribe(res => {

        this.pedidos = res;

      });

  }

  cadastrarProduto() {

    if (
      this.novoProduto.nome.trim() &&
      this.novoProduto.preco > 0
    ) {

      this.estoqueservice
        .cadastrar(this.novoProduto)
        .subscribe(() => {

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

  atualizarStatusPedido(pedido: any, status: string) {
    let mensagem = '';
    // ATENDIDO
    if (status === 'Atendido') {
      mensagem =
        'Seu pedido foi atendido e será enviado para você. Aguarde novas instruções no email.';
    }
    // RECUSADO
    if (status === 'Recusado') {
      mensagem =
        'Seu pedido foi recusado devido à falta de quantidade de alguns itens.';
    }
    const pedidoAtualizado = {
      ...pedido,
      status: status,
      mensagemStatus: mensagem
    };
    this.estoqueservice
      .atualizarPedido(
        pedido.id,
        pedidoAtualizado
      )
      .subscribe((pedidoAtualizadoServidor) => {
        // Atualiza o pedido na tela SEM F5
        const index = this.pedidos.findIndex(
          p => p.id === pedido.id
        );
        if (index !== -1) {
          this.pedidos[index] =
            pedidoAtualizadoServidor;
        }
        alert(`Pedido ${status.toLowerCase()} com sucesso!`);
      });
  }
  alterarEstoque(produto: Produto, delta: number) {
    const novoEstoque =
      produto.estoque + delta;
    if (novoEstoque < 0) return;
    const atualizado = {
      ...produto,
      estoque: novoEstoque
    };
    this.estoqueservice
      .atualizarProduto(produto.id, atualizado)
      .subscribe(() => {
        produto.estoque = novoEstoque;
      });

  }

  remover(id: string) {

    this.estoqueservice
      .excluirProduto(id)
      .subscribe(() => {

        this.listarTudo();

      });

  }

  getStatus(produto: Produto): string {

    return produto.estoque <= 5
      ? 'Crítico'
      : 'Em dia';

  }

}