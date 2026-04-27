import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './historico.html',
  styleUrls: ['./historico.css']
})
export class Historico {

  historico = [
    { data: '03/04/2026', produto: 'Tênis Air Max', marca: 'Nike', valor: 450 },
    { data: '03/04/2026', produto: 'Camisa Treino', marca: 'Adidas', valor: 120 },
    { data: '02/04/2026', produto: 'Meias Pack', marca: 'Puma', valor: 45 },
    { data: '02/04/2026', produto: 'Chuteira Campo', marca: 'Reebok', valor: 380 },
    { data: '01/04/2026', produto: 'Mochila Sport', marca: 'Nike', valor: 195 }
  ];

}