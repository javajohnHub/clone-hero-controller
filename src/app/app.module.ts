import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'ng-universal-heroku-demo'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
