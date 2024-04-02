import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiniGamesComponent } from '../mini-games/mini-games.component';
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
  constructor(private auth:AuthentificationService){

  }
  ngOnInit(): void {
    
    this.getProfileData();
   
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
   
  }
  openOverallGames(){
    this.isSpecificGames=false;
   

  }

  
  search(){
    console.log( this.searchGames);
    
   
  }

}
