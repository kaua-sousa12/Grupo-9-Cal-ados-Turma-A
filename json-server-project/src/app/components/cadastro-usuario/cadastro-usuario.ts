import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuario {

  usuario = {
    nome: '',
    email: '',
    telefone: '',
    profissao: '',
    senha: ''
  };

  constructor(private api: ApiService, private router: Router) { }

  cadastrar() {

    if (
      !this.usuario.nome ||
      !this.usuario.email ||
      !this.usuario.telefone ||
      !this.usuario.profissao ||
      !this.usuario.senha
    ) {
      alert('Preencha todos os campos!');
      return;
    }

    this.api.createUsuario(this.usuario).subscribe({
      next: () => {
        alert('Cadastrado com sucesso!');

        this.usuario = {
          nome: '',
          email: '',
          telefone: '',
          profissao: '',
          senha: ''
        };
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar');
      }
    });
  }
}