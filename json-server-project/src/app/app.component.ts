import { Component } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { PostsComponent } from './components/posts/posts.component';
import { CadastroUsuario } from './components/cadastro-usuario/cadastro-usuario';
import { FormsModule } from '@angular/forms';
import { GestaoMarcas } from "./components/gestao-marcas/gestao-marcas";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
    RouterOutlet
],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'json-server-project';
}