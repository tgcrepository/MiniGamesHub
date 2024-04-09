import { Component, OnInit } from '@angular/core';
import { NgClass,NgIf,NgFor,JsonPipe } from '@angular/common';


import { AuthentificationService } from '../../service/authentification.service';
import { never } from 'rxjs';

@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [NgClass,NgIf,NgFor,JsonPipe],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.scss'
})
export class LeaderBoardComponent implements OnInit {
  showSpecificGames:boolean=true;
  isCoinsActive:boolean=true;
  profileData: any;
  profileInfo:any;
  spacificGameLeaderBoard:any;
  specificLeaderBoard: any=[];
  spacificGameLeaderBoardData: any;
  gameData: any;
  GameCard: any;
  idGame: any;
  leaderboard: any[]=[];
  selectedValue:any;

  Overallleaderboard: any[] = [];
  spacificGameLeaderBoardDataForCoins: any;
  isCoinsActiveOverall:boolean=true;
  spacificGameLeaderBoardForCoins: any;
  specificLeaderBoardforCoins:any[]=[];
  // overallGamesLeaderBoard: any[]=[];
  overallGamesLeaderBoard:any;

  overallGameLeaderBoardDataForQuiz: any;
  overallGamesLeaderBoardForCoins: any;
  constructor(private auth:AuthentificationService){

  }
  ngOnInit(): void {
  this.profileData=localStorage.getItem('ProfileData');

  this.profileInfo=JSON.parse(this.profileData);
  let orgId=this.profileInfo?.ID_ORGANIZATION;
    this.auth.getGameDataList(orgId).subscribe((res)=>{
      this.gameData=res;
      this.GameCard=this.gameData?.games;
    this.selectedValue=this.gameData?.games[0]?.id_game;
    this.openSpecificGames()
    //  this.getLeaderDataForSpecificGamesForCoins(this.selectedValue);
      
    })

  }
 
  onGameSelectionChange(selectedId:any){
    console.log(selectedId.target.value)
    const selectedGame = this.GameCard.find((game:any) => game.id_game === selectedId);
    // this.getGameIdForAssessment(selectedId.target.value);
    // this.getGameIdForGamePlay(selectedId.target.value);
    this.getLeaderBoardDataForSpecificGamesForQuiz(selectedId.target.value);
    this.getLeaderDataForSpecificGamesForCoins(selectedId.target.value);
    this.selectedValue=selectedId.target.value
     console.log(selectedGame);

  }
  // getGameIdForAssessment(data:any){
  //   this.idGame=data;
  //   console.log(data)
   
   
  //   // this.openAssessmentLeaderboard(data)
  
   
    

    
 

  // }
  // getGameIdForGamePlay(data:any){
  //   this.idGame=data;
  //   console.log(data)
  //   this.getLeaderDataForSpecificGamesForCoins(data);
  //   // this.openCoinsLeaderboard(data)

  // }

  getLeaderBoardDataForSpecificGamesForQuiz(data:any){
    const body = {
      id_game: data,
      orgId: this.profileInfo?.ID_ORGANIZATION
  };

  this.auth.getLeaderBoard(body).subscribe((res) => {
      this.spacificGameLeaderBoard = res;
      console.log('specific',this.spacificGameLeaderBoard);
    
      
    
      this.spacificGameLeaderBoardData = this.spacificGameLeaderBoard?.leaderboard.map((element: any) => {
          let userInfo = {
              id_game: data,
              orgId: this.profileInfo?.ID_ORGANIZATION,
              id_user: element?.id_user
          };

         
          this.auth.getLeaderBoardInfo(userInfo).subscribe((res) => {
            return this.specificLeaderBoard.push(res);
              
          });

         
          return element;
      });
      
    
  });
  
    

  }
  getLeaderDataForSpecificGamesForCoins(data:any){
    const body = {
      id_game: data,
      orgId: this.profileInfo?.ID_ORGANIZATION
  };

  this.auth.getLeaderBoardForCoins(body).subscribe((res) => {
      this.spacificGameLeaderBoard = res;
      console.log('specific',this.spacificGameLeaderBoard);
    
      
    
      this.spacificGameLeaderBoardDataForCoins =this.spacificGameLeaderBoard;
      
      
    
  });
  
    

  }
  
  

  getOverallLeaderBoard(){
   
    // this.profileInfo?.ID_ORGANIZATION
    this.auth.getOverallLeaderBoard(this.profileInfo?.ID_ORGANIZATION).subscribe((res)=>{
      this.overallGamesLeaderBoard = res;
      console.log(this.overallGamesLeaderBoard?.leaderboard);
    
      
      
    
  
    })
  }
  getOverallLeaderBoardCoins(){
    this.auth.getOverallLeaderBoardCoins(this.profileInfo?.ID_ORGANIZATION).subscribe((res)=>{
      this.overallGamesLeaderBoardForCoins=res;
      console.log(this.overallGamesLeaderBoardForCoins)
    })

  }



  openSpecificGames() {
    console.log(this.idGame)
    this.showSpecificGames = true;
    // this.getLeaderBoardDataForSpecificGamesForQuiz(data);
    this.openCoinsLeaderboard()
    this.getLeaderDataForSpecificGamesForCoins(this.selectedValue);
    
}
  openOverallGames(){
    console.log(this.openOverallGames)
    this.showSpecificGames=false;
    this.openOverallCoinsLeaderboard();
  }
  openCoinsLeaderboard(){
    this.isCoinsActive=true;
    // this.getGameIdForAssessment(selectedValue);
    this.getLeaderDataForSpecificGamesForCoins(this.selectedValue);
  }
  openOverallCoinsLeaderboard(){

    this.isCoinsActiveOverall=true;
    this.getOverallLeaderBoardCoins();

  }
  openOverallAssessmentLeaderBoard(){
    this.isCoinsActiveOverall=false;
    this.getOverallLeaderBoard();
  }

  openAssessmentLeaderboard(){
    this.isCoinsActive=false;
    // this.getGameIdForGamePlay(this.gameData?.games[0]?.id_game);
    this.getLeaderBoardDataForSpecificGamesForQuiz(this.selectedValue);
   
  }

}
