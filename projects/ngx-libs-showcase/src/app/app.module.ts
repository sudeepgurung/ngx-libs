import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxMitiModule } from 'projects/ngx-miti/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxMitiModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
