import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produtos`);
  }

  getCarrinho(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carrinho`);
  }

  cadastrar(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/produtos`, produto);
  }

  atualizarProduto(id: string, produto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/produtos/${id}`, produto);
  }

  excluirProduto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produtos/${id}`);
  }

  adicionarAoCarrinho(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrinho`, item);
  }
}