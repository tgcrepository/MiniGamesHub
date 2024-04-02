import { Routes, provideRouter, withHashLocation } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GamesHomeComponent } from './components/games-home/games-home.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'home',component:GamesHomeComponent}
];
// bootstrapApplication(AppComponent,
//     {
//         providers:[
//             provideRouter(routes,withHashLocation())
//         ]
//     });
