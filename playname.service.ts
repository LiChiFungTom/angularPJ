import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlaynameService {
  player1name : string = "";
  
  player2name : string = "";
 
  // name: string[] = [];

  // add(name: string){
  //   this.name.push(name)
  // }
  constructor() { }
}
