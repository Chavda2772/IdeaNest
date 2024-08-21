import { Component } from '@angular/core';

@Component({
  selector: 'app-nest-item',
  standalone: true,
  imports: [],
  templateUrl: './nest-item.component.html',
  styleUrl: './nest-item.component.css',
})
export class NestItemComponent {
  title = 'UI/UX Review Check';
  url = 'https://www.google.com/';
  imageUrl =
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png';
  description =
    'Google is a search engine that allows users to find information on the internet. It is one of the most popular websites in the world.';
}
