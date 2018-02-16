import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

import { PlasticItemComponent } from './components/plastic-item/plastic-item.component';
import { LdbService } from './services/ldb.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from "clarity-angular";

import { AppRoutingModule } from "./routing.module";
import { PlasticComponent } from "./components/plastic/plastic.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PlasticComponent,
    PlasticItemComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,

    BrowserAnimationsModule,
    AppRoutingModule,

    FormsModule,
    ClarityModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [LdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
