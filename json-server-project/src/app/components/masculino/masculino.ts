import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-masculino',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './masculino.html',
  styleUrl: './masculino.css',
})
export class Masculino {}
