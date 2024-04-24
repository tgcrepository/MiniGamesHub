import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { JsonPipe } from '@angular/common';
import { SearchPipe } from '../../pipes/search.pipe';
import { AuthentificationService } from '../../service/authentification.service';

@Component({
  selector: 'app-mini-games',
  standalone: true,
  imports: [NgIf,NgFor,NgClass,CardComponent,JsonPipe,SearchPipe],
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.scss'
})
export class MiniGamesComponent implements OnInit{
  isFrontView:boolean=true;
  openCardId: number | null = null; // Track the ID of the open card, null means no card is open
  @Input() searchData:any;
  GameCard:any;
  filteredGameList: any;
  constructor(public auth:AuthentificationService){}
  gameData:any=[];
  card: any;

  ngOnInit():void{
    console.log(this.searchData);
   let orgId=localStorage.getItem('id_org');
    this.auth.getGameDataList(orgId).subscribe((res)=>{
      this.gameData=res;
      this.gameData.games.sort((a:any, b:any) => {
        // If a's enable_status is 1 and b's enable_status is not 1, move a before b
        if (a.enable_status === 1 && b.enable_status !== 1) {
          return -1;
        }
        // If b's enable_status is 1 and a's enable_status is not 1, move b before a
        else if (b.enable_status === 1 && a.enable_status !== 1) {
          return 1;
        }
        // Otherwise, maintain the original order
        else {
          return 0;
        }
      });
      this.GameCard=this.gameData?.games;
      console.log(this.GameCard);
      
    })
   
  }


  openFrontCard(){
      this.isFrontView=true;
  }
 
  openCardById(cardId: number) {

    this.card = this.GameCard.find((card:any) => card.id === cardId);
    if (this.card) {
      console.log(this.card);
      // Set isFrontView to false only for the clicked card
      this.isFrontView = this.GameCard.map((card:any) => card.id).includes(cardId) ? false : true;
    }  

    
}



search(){
  console.log(this.searchData);
}

 // Function to toggle the state of the card (open/close)
 toggleCard(cardId: number): void {
  if (this.openCardId === cardId) {
    // If the clicked card is already open, close it
    this.openCardId = null;
  } else {
    // Otherwise, open the clicked card
    this.openCardId = cardId;
  }
}

}
