import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './estoque.html',
  styleUrl: './estoque.css'
})
export class Estoque {
 
}