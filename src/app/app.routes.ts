import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GamesHomeComponent } from './components/games-home/games-home.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'home',component:GamesHomeComponent}
];
