import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlasticComponent} from "./components/plastic/plastic.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";


const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: PlasticComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ) 
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {} 