import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { MelhorEnvioService } from '../../services/melhor-envio';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  usuarioLogado: any = null;
  carrinho: any[] = [];

  cepDestino: string = '';
  freteOpcoes: any[] = [];
  freteSelecionado: any = null;
  calculandoFrete: boolean = false;
  erroFrete: string = '';

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private melhorEnvio: MelhorEnvioService
  ) {}

  ngOnInit(): void {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuario') || 'null');
  }

  calcularFrete() {
    if (this.cepDestino.length < 8) {
      this.erroFrete = 'CEP inválido!';
      return;
    }

    this.calculandoFrete = true;
    this.erroFrete = '';
    this.freteOpcoes = [];

    const cepOrigem = '01310100'; // CEP da loja

    this.melhorEnvio.calcularFrete(cepOrigem, this.cepDestino).subscribe({
      next: (resultado: any) => {
        this.freteOpcoes = resultado.filter((op: any) => !op.error);
        this.calculandoFrete = false;
      },
      error: () => {
        this.erroFrete = 'Erro ao calcular frete. Tente novamente.';
        this.calculandoFrete = false;
      }
    });
  }

  selecionarFrete(opcao: any) {
    this.freteSelecionado = opcao;
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
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    const pedido = {
      usuarioId: usuario.id,
      nomeUsuario: usuario.nome,
      itens: this.carrinho.map(item => ({
        produto: item.nome || item.produto,
        quantidade: item.quantidade,
        preco: item.preco,
        imagem: '/' + item.imagem
      })),
      frete: this.freteSelecionado ? this.freteSelecionado.price : 0,
      total: this.calcularTotal() + (this.freteSelecionado ? parseFloat(this.freteSelecionado.price) : 0),
      status: 'Pendente',
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
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }
}