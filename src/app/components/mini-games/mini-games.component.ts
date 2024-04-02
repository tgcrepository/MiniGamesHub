import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { JsonPipe } from '@angular/common';
import { AuthentificationService } from '../../service/authentification.service';

@Component({
  selector: 'app-mini-games',
  standalone: true,
  imports: [NgIf,NgFor,NgClass,CardComponent,JsonPipe],
  templateUrl: './mini-games.component.html',
  styleUrl: './mini-games.component.scss'
})
export class MiniGamesComponent implements OnInit{
  isFrontView:boolean=true;
  openCardId: number | null = null; // Track the ID of the open card, null means no card is open
  @Input() searchData:any;
  GameCard:any=[];
  constructor(public auth:AuthentificationService){}

  // GameCard = [
  //   {
  //     id:1,
  //     frontImageSrc: "assets/GameImages/qrgamewebsiteassets/Apple king.png",
  //     backImageSrc: "",
  //     gameName: "Apple King",
  //     coins: 60,
  //     points: 200,
  //     isActive:1,
  //     gameUrl:'https://www.playtolearn.in/AppleKing-minigame/?Email=rajatb&OrgID=18&M2ostAssessmentId=0&idgame=11&gameassid=71'
  //   },
  //   {
  //     id:2,
  //     frontImageSrc:"assets/GameImages/Snake Pass.png",
  //     backImageSrc: "",
  //     gameName: "Snake Pass",
  //     coins: 60,
  //     points: 200,
  //     isActive:0,
  //     gameUrl:'https://www.playtolearn.in/Snake-Minigame_production/?Email=bata402_BA&OrgID=15&M2ostAssessmentId=478&idgame=12&gameassid=47'
  //   },
  //   {
  //     id:3,
  //     frontImageSrc: "assets/GameImages/Whack a mole.png",
  //     backImageSrc: "",
  //     gameName: "Whack a Mole",
  //     coins: 60,
  //     points: 200,
  //     isActive:0,
  //     gameUrl:'https://www.playtolearn.in/Whack-a-mole-Minigame-Prod/?Email=Bata509_BA&OrgID=18&M2ostAssessmentId=509&idgame=13&gameassid=19'
  //   },
  //   {
  //     id:4,
  //     frontImageSrc: "assets/GameImages/Finny fish.png",
  //     backImageSrc: "",
  //     gameName: "Finny Fish",
  //     coins: 60,
  //     points: 200,
  //     isActive:0,
  //     gameUrl:''

  //   },
  //   {
  //     id:5,
  //     frontImageSrc: "assets/GameImages/FlaSH RACER.png",
  //     backImageSrc: "",
  //     gameName: "Flash Racer",
  //     coins: 60,
  //     points: 200,
  //     isActive:0,
  //     gameUrl:'https://www.playtolearn.in/Car-Racer-Minigame/?Email=bata501&OrgID=15&M2ostAssessmentId=478&idgame=11&gameassid=16'
  //   },
  //   {
  //     id:6,
  //     frontImageSrc: "assets/GameImages/qrgamewebsiteassets/Flippy Flamingo Logo (1) 1 (1).png",
  //     backImageSrc: "",
  //     gameName: "Flippy Flamingo",
  //     coins: 60,
  //     points: 200,
  //     isActive:0,
  //     gameUrl:'https://www.playtolearn.in/Flappy-Bird-Game-beta/?Email=Bata501&OrgID=15&M2ostAssessmentId=0&idgame=11&gameassid=15'
  //   }
  // ];
  gameData:any=[];
  card: any;

  ngOnInit():void{
    console.log(this.searchData);
   let orgId='18'
    this.auth.getGameDataList(orgId).subscribe((res)=>{
      this.gameData=res;
      this.GameCard=this.gameData?.games;

      console.log(this.GameCard);
      
    })
   
  }

  showMyLeaderBoard(){
      this.isFrontView=false; 
  }
  openFrontCard(){
      this.isFrontView=true;
  }
 
  openCardById(cardId: number) {
    console.log(cardId);
    console.log(this.searchData);
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
