import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';



import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(), provideAnimationsAsync(),{provide: LocationStrategy, useClass:HashLocationStrategy}, provideAnimationsAsync()],

};
