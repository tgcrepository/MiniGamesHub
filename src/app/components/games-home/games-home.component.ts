import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiniGamesComponent } from '../mini-games/mini-games.component';
import { Route, Router } from '@angular/router';
import { LeaderBoardComponent } from "../leader-board/leader-board.component";
import { AuthentificationService } from '../../service/authentification.service';

@Component({
    selector: 'app-games-home',
    standalone: true,
    templateUrl: './games-home.component.html',
    styleUrl: './games-home.component.scss',
    imports: [NgClass, NgIf, MiniGamesComponent, LeaderBoardComponent,FormsModule]
})
export class GamesHomeComponent implements OnInit {
  isMiniGamesActive:boolean=true;
  isLeaderBoardActive:boolean=false;
  searchGames:string='';
  isSpecificGames:boolean=true;
  
  isLeaderBoardOptionAvailable:boolean=false;
  isOverallGames: boolean=false;
  userInfo:any;
  profileInfo: any;
  spacificGameLeaderBoard: any;
  spacificGameLeaderBoardData: any;
  specificLeaderBoard: any;
  constructor(private auth:AuthentificationService,public route:Router){

  }
  ngOnInit(): void {
    
    this.getProfileData();
    // this.OpenSpecificGames();
   
    
  }

  dark_color='Blue';
  content1:any;

  getProfileData(){
   this.userInfo=localStorage.getItem(('ProfileData'));
   console.log(JSON.parse(this.userInfo));
   this.profileInfo=JSON.parse(this.userInfo);
   

  }
  openMiniGamesTab(){
    this.isMiniGamesActive=true;
    this.isLeaderBoardActive=false;
  }
  openLeaderBoardTab(){
    this.isLeaderBoardActive=true;
    this.isMiniGamesActive=false;


  }
  openLeaderBoardOptions(){
    this.isLeaderBoardActive=!this.isLeaderBoardActive;
    this.isMiniGamesActive=!this.isMiniGamesActive;
    this.isLeaderBoardOptionAvailable=!this.isLeaderBoardOptionAvailable;

  }
  OpenSpecificGames(){
    this.isSpecificGames=true;
    const body = {
      id_game: 11,
      orgId: this.profileInfo?.ID_ORGANIZATION
  };

  this.auth.getLeaderBoard(body).subscribe((res) => {
      this.spacificGameLeaderBoard = res;
      console.log('specific',this.spacificGameLeaderBoard);
    
      
    
      this.spacificGameLeaderBoardData = this.spacificGameLeaderBoard?.leaderboard.map((element: any) => {
          let userInfo = {
              id_game: '11',
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
  openOverallGames(){
    this.isSpecificGames=false;
   

  }
  
    logout(){

      this.route.navigateByUrl('/')
      localStorage.clear();      
    }
   

  
  search(){
    console.log( this.searchGames);
    
   
  }

}
