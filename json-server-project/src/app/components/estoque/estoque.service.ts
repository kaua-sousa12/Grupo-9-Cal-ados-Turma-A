import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private apiUrl = 'http://localhost:3000/produtos';
  private apiCarrinho = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCarrinho(): Observable<any[]> {
    return this.http.get<any[]>(this.apiCarrinho);
  }

  cadastrar(produto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto);
  }

  atualizarProduto(id: string, dados: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dados);
  }

  excluirProduto(id: string): Observable<any> { // ✔️ string
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  adicionarAoCarrinho(item: any): Observable<any> {
    return this.http.post<any>(this.apiCarrinho, item);
  }
}