import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = "";
  senha: string = "";

  constructor(private router: Router) { }
  login() {


    const email = this.email.trim();
    const senha = this.senha.trim();


    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }
    fetch(`http://localhost:3000/usuarios?email=${email}`)
      .then(res => res.json())
      .then((usuarios: any[]) => {

        if (usuarios.length > 0 && usuarios[0].senha === senha) {

          localStorage.setItem('usuario', JSON.stringify(usuarios[0]));

          alert('Login realizado com sucesso!');

          this.router.navigate(['/estoque']);
        } else {
          alert('Email ou senha incorretos');
        }
      })
      .catch(err => {
        console.error('ERRO:', err);
        alert('Erro ao conectar com o servidor');
      });
  }
}



