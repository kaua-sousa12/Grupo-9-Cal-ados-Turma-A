import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-masculino',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './masculino.html',
  styleUrl: './masculino.css',
})
export class Masculino implements OnInit {

  quantidadeCarrinho = 0;


  produtos = [

    {
      id: 1,
      nome: 'Nike Dunk',
      preco: 699.90,
      imagem: 'assets/images/nike-dunk.webp'
    },

    {
      id: 2,
      nome: 'Puma RS-X',
      preco: 599.90,
      imagem: 'assets/images/puma rs.webp'
    },

    {
      id: 3,
      nome: 'Puma 180',
      preco: 699.90,
      imagem: 'assets/images/puma-180.webp'
    }

  ];

  ngOnInit(): void {

    const carrinho = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    this.quantidadeCarrinho = carrinho.reduce(
      (total: number, item: any) => total + item.quantidade,
      0
    );

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
      (total: number, item: any) => total + item.quantidade,
      0
    );

    alert('Produto adicionado ao carrinho!');
  }
}
