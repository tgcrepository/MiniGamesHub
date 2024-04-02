import { Component,Input, OnInit } from '@angular/core';

import { NgFor,NgIf,NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() gamesData:any;
  constructor(){}
  ngOnInit() {
   
  }
  isFrontView:boolean=true;

  openCardById(data:any,isActive:any){
    console.log(data)
    if(isActive==1)
    this.isFrontView=false;

  }
  openGame(data:any){
    console.log(data);
    const gameUrl=data?.game_url
    
    window.open(gameUrl,'_self')
   


  }
  openFrontCard(){
    this.isFrontView=true;

  }
}
