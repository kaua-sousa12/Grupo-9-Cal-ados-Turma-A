import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';
import { GestaoMarcas } from './components/gestao-marcas/gestao-marcas';
import { Historico } from './components/historico/historico';
import { Login } from './components/login/login';
import { Estoque } from './components/estoque/estoque';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'cadastro', component: CadastroUsuario },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'gestaomarcas', component: GestaoMarcas },
  { path: 'historico', component: Historico },
  { path: 'login', component: Login },
  { path: 'estoque', component: Estoque },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes) 
  ]
};