import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-historico',
  imports: [FormsModule, RouterLink],
  templateUrl: './historico.html',
  styleUrl: './historico.css',
})
export class Historico {}
