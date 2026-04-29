import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feminino',
  imports: [FormsModule, RouterLink],
  templateUrl: './feminino.html',
  styleUrl: './feminino.css',
})
export class Feminino {}
