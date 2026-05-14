import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Usuario } from '../../models/models';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
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
}

