import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MiniGamesComponent } from '../mini-games/mini-games.component';
import { NavigationExtras, Route, Router } from '@angular/router';
import { LeaderBoardComponent } from "../leader-board/leader-board.component";
import { AuthentificationService } from '../../service/authentification.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CantLogoutComponent } from '../dialogs/cant-logout/cant-logout.component';
@Component({
    selector: 'app-games-home',
    standalone: true,
    templateUrl: './games-home.component.html',
    styleUrl: './games-home.component.scss',

    imports: [NgClass, NgIf, MiniGamesComponent, LeaderBoardComponent,FormsModule,MatDialogModule]
})
export class GamesHomeComponent implements OnInit {
  isMiniGamesActive:boolean=true;
  isLeaderBoardActive:boolean=false;
  searchGames:string='';
  isSpecificGames:boolean=true;
  isLeaderBoardOptionAvailable:boolean=false;
  isOverallGames: boolean=false;
  userInfo:any;
  userId:any;
  profileInfo: any;
  spacificGameLeaderBoard: any;
  spacificGameLeaderBoardData: any;
  specificLeaderBoard: any;
  logoData: any;
  tabTitle:string="Mini Games"
  NgageLogo: any;
  NgageDashboardLogo: any;

  constructor(public auth:AuthentificationService,public route:Router,public dialog:MatDialog){
  }
  ngOnInit(): void {
    this.getProfileData();

  }
  dark_color='Blue';
  content1:any;
  getProfileData(){
   this.userInfo=localStorage.getItem(('ProfileData'));
   this.profileInfo=JSON.parse(this.userInfo);
   console.log(this.profileInfo?.ID_ORGANIZATION);
   const targetOrganizations = [19, 36, 37, 38];

   if (targetOrganizations.includes(this.profileInfo?.ID_ORGANIZATION)) {
       this.tabTitle = "IKS Values Micro Games";
   }
   this.auth.getLogos(this.profileInfo?.ID_ORGANIZATION).subscribe((res)=>{
    this.logoData=res;
    this.NgageDashboardLogo=this.logoData?.dashboard_logo;
  })
  }

  openMiniGamesTab(){
    this.isMiniGamesActive=true;
    this.isLeaderBoardActive=false;
  }
  openCantLogout() {
    const dialogRef = this.dialog.open(CantLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    this.auth.isSpecficGamesOpen=true;
  }
  openOverallGames(){
    this.isSpecificGames=false;
    this.auth.isSpecficGamesOpen=false;

  }
  
    logout(){
      this.userId=localStorage.getItem('userid');
      console.log("LogOut",this.userId);
      
      if (this.userId=='undefined') {
        const orgId=localStorage.getItem('id_org')
      const navigationExtras: NavigationExtras = {
        queryParams: {
          org_id: orgId
        }
      };
      this.route.navigate(['/'], navigationExtras);
      localStorage.clear(); 
      }
      else{
        this.openCantLogout();
      }
      
         
    }
   

  


}
