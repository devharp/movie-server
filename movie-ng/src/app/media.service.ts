import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from './constants/app.constants';
import { MediaType } from './interface/media-type.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  public mediaId: number | undefined;

  public mediaInfo: MediaType | undefined;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public goToMedia(id: number): void {
    this.mediaId = id;
    this.httpClient.get<MediaType>(APP_CONSTANTS.movieBy + '?id=' + this.mediaId)
    .subscribe((response) => {
      this.mediaInfo = response;
      this.router.navigate(['/media'])
    });
  }

}
