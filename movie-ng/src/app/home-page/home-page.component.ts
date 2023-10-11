import { Component, OnInit } from '@angular/core';
import { MediaType } from '../interface/media-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../constants/app.constants';
import { MediaService } from '../media.service';

interface MovieSuggestionType {
  title: string;
  id: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public movieSuggestions: Array<MovieSuggestionType> = [];
  public mediaItems: Array<MediaType> = [];
  public searchForm: FormGroup;

  constructor(private httpClient: HttpClient, private searchFormBuilder: FormBuilder, private mediaService: MediaService) {
    this.searchForm = this.searchFormBuilder.group({
      query: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.httpClient.get<Array<MediaType>>(APP_CONSTANTS.movies)
      .subscribe((movies) => this.mediaItems = movies);

    this.searchForm.get('query')?.valueChanges.subscribe((query: string) => {
      console.log({ query });
      this.httpClient.get<Array<MovieSuggestionType>>(APP_CONSTANTS.search + '?q=' + query)
        .subscribe((resposne) => this.movieSuggestions = resposne)
    })
  }

  public searchQuery() {
    if (!this.searchForm.get('query')?.value.length) { return; }
    this.httpClient.get(APP_CONSTANTS.search + '?q=' + this.searchForm.get('query')?.value)
      .subscribe((resposne) => console.log(resposne))
    this.searchForm.get('query')?.reset('');
  }

  public onMovieSuggestionClicked(id: number): void {
    this.mediaService.goToMedia(id);
  }
}
