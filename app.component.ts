import { trigger } from '@angular/animations';
import { Component, OnInit, ViewChild ,ElementRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { PlayScoreService } from './play-score.service';
import { PlaynameService } from './playname.service';
import {MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { DialogOverview1Component } from './dialog-overview1/dialog-overview1.component';
import { DialogOverview2Component } from './dialog-overview2/dialog-overview2.component';
import { DialogOverview3Component } from './dialog-overview3/dialog-overview3.component';
import {io} from 'socket.io-client';
import { DialogOverview4Component } from './dialog-overview4/dialog-overview4.component';
import { CanvasComponent } from 'angular-canvas';
import * as paper from 'paper';
import { analyzeAndValidateNgModules, ParsedProperty } from '@angular/compiler';
import { Path, Point, Rectangle, Shape, Size, Tool } from 'paper/dist/paper-core';
import { client } from 'stompjs';
import { timingSafeEqual } from 'crypto';
import { DialogOverview5Component } from './dialog-overview5/dialog-overview5.component';




 export interface DialogData {
   name: any;
   animal:any;
   timeLeft:any;
 }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

@ViewChild('canvas',{read:ElementRef, static:true}) canvas?:ElementRef;

 path? : paper.Path;
  
  
  // rectangle x and y
  clientx2:any;
  clienty2 : any;
  clientx1: any;
  clienty1 : any;
  
  // draw the rectangle setting
  point1:any;
  point2:any;
  length: any;
  weight:any;
  point:any;

  //player score
  player1score : number = 0;
  player2score : number = 0;

  // player 1 balls
  redballs : number =0;
  yellowballs : number =0;
  blueballs : number =0;
  
  //player 2 balls
  redballs2 : number =0;
  yellowballs2 : number =0;
  blueballs2 : number =0;


  sub:Subscription | null = null;
  
  socket :any;
  public data:any;

  name: string="";        // player 1 name
  animal: string="";      // player 2 name
  timeLeft:any = 10;      // default value for count down and the first display value
  interval:any;         // to stop count down
  timedefault:any =60;      // for save the time settung value  and the default value when the time end

  



  title = 'AlienPi Ball Game';
  constructor(private router: Router,public playerNameService: PlaynameService,public dialog:MatDialog) {
     this.socket = io('http://192.168.1.168:4000/')
  } 
   
   
    // menu setting 

    openDialog():void{
    //player name 1 dialog
    const dialogRef = this.dialog.open(DialogOverviewComponent,{
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playerNameService.player1name = result;
      console.log(this.playerNameService.player1name);
      // player 2 name dialog
      const dialogRef1 = this.dialog.open(DialogOverview1Component,{
        width: '250px',
        data: {animal: this.animal}
      });
      dialogRef1.afterClosed().subscribe(result => {
        this.playerNameService.player2name=result;
        console.log(this.playerNameService.player2name);
      
        // start game dialog
      const dialogRef2 = this.dialog.open(DialogOverview2Component,{
          width: '250px',
        });
      
        // when dialog close reset the point and start the count down 
        dialogRef2.afterClosed().subscribe(result =>{
            this.player1score =0;
            console.log(this.player1score);
            this.player2score =0;
            console.log(this.player2score);
            
            this.redballs =0;
            this.yellowballs  =0;
            this.blueballs =0;

            this.redballs2 =0;
            this.yellowballs2  =0;
            this.blueballs2 =0;

            this.interval = setInterval(() => {
              if(this.timeLeft > 0) {
                this.timeLeft--;
              }else{                                            
                  // when the time is end will show that which player win the game.
                  if(this.player1score == this.player2score ){              
                    window.alert("Tie");
                  }
                  if(this.player1score > this.player2score){
                    window.alert("player 1 win !");
                  }
                  if(this.player2score > this.player1score){
                    window.alert("player 2 win !");
                  }
                   
                clearInterval(this.interval);
                this.timeLeft = this.timedefault;
                 interval;
              }
            },1000)
        });

      });

    });
   }
   

   openTimeDialog() :void{
     // timer setting dialog
    const dialogRef3 = this.dialog.open(DialogOverview3Component,{
      width: '250px',
      data:{timeLeft: this.timeLeft}
    });
    // set the time and stop the count down 
    dialogRef3.afterClosed().subscribe(result =>{
      clearInterval(this.interval);
      this.timeLeft = result;
        interval;
      this.timedefault = result;
      
    })
  }

  // score zone setting   !! only can send one rectangle  data and dont know the player is was!!
  openZoneDialog():void{
    const dialogRef4 = this.dialog.open(DialogOverview4Component,{
      width: '250px',
    });
    
    dialogRef4.afterClosed().subscribe(result =>{
      
      this.socket.emit("zone",{"clientX1": this.clientx1})
      this.socket.emit("zone",{"clientX2": this.clientx2})
      this.socket.emit("zone",{"clientY1": this.clienty1})
      this.socket.emit("zone",{"clientY1": this.clienty2})
      this.socket.emit("zone",{"h": this.length})
      this.socket.emit("zone",{"w": this.weight})


    })

  }


  // for clear the Path
  clear():void{
    const dialogRef5 = this.dialog.open(DialogOverview5Component,{
      width: '250px',
    });

    dialogRef5.afterClosed().subscribe(result =>{
       this.path = new paper.Path();
       paper.project.activeLayer.removeChildren();
    })
  }


  // draw the rectangle

  mousedown(em:any):void{
    // check it work or not work
    console.log('down')
    console.log(em.clientX ,em.clientY);
    
    // save the mouse event x and y
    this.clientx2 = em.clientX;
    this.clienty2 = em.layerY;

    // save the data of x and y
    this.point1 = new paper.Point(this.clientx2,this.clienty2)
  }

  //draw the rectangle

  mouseup(e:any):void{
    //check it work or not work
    console.log('up')
    console.log(e.clientX,e.clientY);
   
    // save the mouse event x and y
    this.clientx1 = e.clientX;
    this.clienty1 = e.layerY;
    
    this.point2 = new paper.Point(this.clientx1,this.clienty1);
    
    // calculate the length and weight
    this.length = this.clientx2-this.clientx1;
    this.weight = this.clienty2-this.clienty1;

    //draw the rectangle
    this.path = new paper.Path.Rectangle(this.point2 , new Size(this.length,this.weight));
    this.path.strokeColor = new paper.Color('red');
    this.path.strokeWidth = 5;

  }







  public ngOnInit(): void {

    this.socket.on( 'test', (data:any) =>{
      console.log(data);
        var json = JSON.parse(data);    
        
        // player 1
        if(json.red == 1 ){
            if(json.player ==1){
              this.redballs +=1;
              this.player1score +=1;
            }    
        }
        
        if (json.yellow == 2){
            if(json.player == 1){
              this.yellowballs +=1;
              this.player1score +=2;
             }
        }

        if(json.blue == 3 ){
            if(json.player == 1){
              this.blueballs +=1;
              this.player1score +=3;
             }
        }

        // player 2 
        if(json.blue2 == 3 && json.player == 2){
          this.blueballs2 +=1;
          this.player2score +=3;
        }

        if(json.yellow2 == 2 && json.player == 2){
          this.yellowballs2 +=1;
          this.player2score +=2;
        }
        
        if(json.red2 == 1 && json.player == 2){
          this.redballs2 +=1;
          this.player2score +=1;
        }

     });
    
      if( this.canvas ){
        console.log('set');
        paper.setup(this.canvas?.nativeElement);
      }else{
        console.log('ca');
      }
       
    
    }

} 