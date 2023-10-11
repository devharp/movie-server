import { Component } from '@angular/core';
import { MediaService } from '../media.service';
import { Router } from '@angular/router';
import { MediaType } from '../interface/media-type.interface';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss']
})
export class MediaPageComponent {

  public mediaInfo?: MediaType;

  constructor(private mediaService: MediaService, private router: Router) {
    
    if(!mediaService.mediaId) { this.router.navigate(['/']) }

    if (this.mediaService.mediaInfo){ this.mediaInfo = this.mediaService.mediaInfo; }

    console.log(this.mediaInfo);

  }

  

}
