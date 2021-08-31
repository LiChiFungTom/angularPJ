import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, observable, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlayScoreService {

   sub:Subscription | null = null;
   
  
  constructor(private zone: NgZone) { 
    
  }
  
 




  // getMessages(): Observable<any> {

  //   return new Observable(observer => {

  //     let source = new EventSource("http://127.0.0.1:2000//listen");
  //     source.onmessage = event => {
  //       this.zone.run(() => {
  //         observer.next(event.data)
  //       })
  //     }

  //     source.addEventListener('online', event => this.zone.run(() => {
  //       observer.next(event)
  //     }));

  //     source.onerror = event => {
  //       this.zone.run(() => {
  //         observer.error(event)
  //       })
  //     }
  //   }
  //   )
  // }


}



