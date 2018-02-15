import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlasticComponent } from './components/plastic/plastic.component';
import { PlasticItemComponent } from './components/plastic-item/plastic-item.component';
import {LdbService} from './services/ldb.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzButtonModule, MzInputModule,MzSelectModule,MzSwitchModule  } from 'ng2-materialize';


@NgModule({
  declarations: [
    AppComponent,
    PlasticComponent,
    PlasticItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MzButtonModule,
    MzInputModule,
    MzSelectModule,
    MzSwitchModule ,
  ],
  providers: [LdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
