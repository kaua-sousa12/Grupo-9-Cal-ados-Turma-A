import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  // A URL onde o seu json-server vai rodar
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  // Função que envia o POST para o banco de dados
  cadastrar(produto: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, produto);
  }

  // Adicione estas URLs no topo do service
private apiCarrinho = 'http://localhost:3000/carrinho';

// Métodos novos:
getCarrinho(): Observable<any[]> {
  return this.http.get<any[]>(this.apiCarrinho);
}

adicionarAoCarrinho(item: any): Observable<any> {
  return this.http.post<any>(this.apiCarrinho, item);
}

atualizarProduto(id: string, dados: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, dados);
}

removerDoCarrinho(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiCarrinho}/${id}`);
}

getProdutos(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

// No seu EstoqueService
excluirProduto(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}