import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Game time';
  constructor(
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

 
  ngOnInit() {
    this.metaService.addTags([
      {name: 'keywords', content: 'Angular, Snake, Games, Piano '},
      {name: 'robots', content: 'index, follow'}
    ]);
    this.metaService.updateTag(
      {
        name: 'description',
        content: 'Cette application a été développée avec Angular version 11.2.10 et bootstrap 4.6.0' +
          ' Elle applique le Routing, le Lazy loading, le Server side rendering et les Progressive Web App (PWA)'
      });
  }


}
