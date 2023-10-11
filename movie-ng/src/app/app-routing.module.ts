import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MediaPageComponent } from './media-page/media-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'media', component: MediaPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
