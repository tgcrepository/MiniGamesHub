import { Component,Input, OnInit } from '@angular/core';

import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() gamesData:any;
  constructor(){}
  ngOnInit() {
    console.log(this.gamesData)
  }
  isFrontView:boolean=true;

  openCardById(data:any){
    this.isFrontView=false;

  }
  openGame(data:any){
    window.open(data,'_self');


  }
  openFrontCard(){
    this.isFrontView=true;

  }
}
