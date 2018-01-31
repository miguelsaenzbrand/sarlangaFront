import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor() {
    this.subscription = this.returnObservable()
      .subscribe(
      numero => {
        console.log('Subcripción: ', numero);
      },
      error => {
        console.log('Error: ', error)
      },
      () => console.log('El observador ha terminado')
      )
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  returnObservable(): Observable<any> {
    return new Observable(
      observer => {
        let contador = 0;
        let intervalo = setInterval(() => {
          contador += 1;
          let salida = {
            valor: contador
          };
          observer.next(salida);
          /* if (contador == 3) {
            clearInterval(intervalo);
            observer.complete();
          } */
          /* if (contador == 2) {
            observer.error('Auxilio!')
          } */
        }, 500);
      })
      .retry(2)
      .map(
      (resp: any) => {
        return resp.valor;
      })
      .filter(
      (valor, index) => {
        if ((valor % 2) == 1) {
          return true
        } else {
          return false
        }
      })
  }
}
