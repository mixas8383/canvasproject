import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PlasticComponent } from './components/plastic/plastic.component';
import { PlasticItemComponent } from './components/plastic-item/plastic-item.component';


@NgModule({
  declarations: [
    AppComponent,
    PlasticComponent,
    PlasticItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
