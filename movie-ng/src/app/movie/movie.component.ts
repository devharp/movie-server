import { Component, Input, OnInit } from '@angular/core';
import { MediaType } from '../interface/media-type.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input()
  public mediaItem?: MediaType;

  constructor() {
  }
  
  public ngOnInit(): void{}

}
