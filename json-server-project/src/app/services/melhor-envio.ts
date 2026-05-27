import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MelhorEnvioService {

  calcularFrete(cepOrigem: string, cepDestino: string): Observable<any[]> {
    const opcoesFrete = [
      {
        id: 1,
        name: 'PAC Correios',
        price: '18.50',
        delivery_time: 7,
        company: { name: 'Correios', picture: '' }
      },
      {
        id: 2,
        name: 'SEDEX Correios',
        price: '34.90',
        delivery_time: 2,
        company: { name: 'Correios', picture: '' }
      },
      {
        id: 3,
        name: 'Jadlog Package',
        price: '22.00',
        delivery_time: 4,
        company: { name: 'Jadlog', picture: '' }
      },
      {
        id: 4,
        name: 'Total Express',
        price: '28.00',
        delivery_time: 3,
        company: { name: 'Total Express', picture: '' }
      }
    ];

    // Simula o delay de uma chamada real (1.5 segundos)
    return of(opcoesFrete);
  }
}