import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { MediaPageComponent } from './media-page/media-page.component';
import { MediaService } from './media.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    HomePageComponent,
    MediaPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
