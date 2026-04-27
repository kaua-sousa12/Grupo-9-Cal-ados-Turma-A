import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstoqueService } from './estoque.service';

@Component({
selector: 'app-estoque',
standalone: true,
imports:[CommonModule, FormsModule],
templateUrl: './estoque.html',
styleUrls: ['./estoque.css']
})

export class EstoqueComponente {
   
  novoProduto = {
    nome: '',
    categoria: '',
    preco:0, 
    quantidade:0
  };


  constructor(private estoqueservice: EstoqueService){}

  cadastrarProduto(){
    const precoNumerico = Number(this.novoProduto.preco);
    if (this.novoProduto.nome.trim() && precoNumerico > 0){
      this.estoqueservice.cadastrar(this.novoProduto).subscribe({
        next: (resultado) => {
          console.log('Sucesso ao salvar no banco!', resultado);

          this.limparFormulario();

          this.listarTudo();
        },
         error: (erro) => {
          console.error('Erro ao salvar produto');
         alert('Erro ao salvar. O servidor (json-server) está ligado?');
          
         }
         
      });


    }else{
      alert('Por favor, preencha o nome e o preço do produto.');
    }
  }

  limparFormulario(){
      this.novoProduto = {
      nome: '',
      categoria: '',
      preco: 0,
      quantidade: 0
    };
  }


  // Dentro da sua classe EstoqueComponente:

produtos: any[] = [];
itensCarrinho: any[] = [];

// Função para carregar tudo ao iniciar
ngOnInit() {
  this.listarTudo();
}

listarTudo() {
  // Busca produtos e carrinho ao mesmo tempo
  this.estoqueservice.getProdutos().subscribe(res => this.produtos = res);
  this.estoqueservice.getCarrinho().subscribe(res => this.itensCarrinho = res);
}

adicionar(produto: any, qtdInput: string) {
  const quantidade = parseInt(qtdInput);

  if (quantidade > 0 && produto.quantidade >= quantidade) {
   
    const estoqueAtualizado = { ...produto, quantidade: produto.quantidade - quantidade };
    
    this.estoqueservice.atualizarProduto(produto.id, estoqueAtualizado).subscribe(() => {
      
      // 2. Adiciona ao carrinho
      const itemCarrinho = {
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: quantidade,
        status: 'reservado'
      };

      this.estoqueservice.adicionarAoCarrinho(itemCarrinho).subscribe(() => {
        alert('Adicionado com sucesso!');
        this.listarTudo(); // Atualiza a tela
      });
    });
  } else {
    alert('Quantidade inválida ou estoque insuficiente!');
  }
}

remover(id: number) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    this.estoqueservice.excluirProduto(id).subscribe(() => {
      alert('Produto removido!');
      this.listarTudo(); // Atualiza a tabela na hora
    });
  }
}

};