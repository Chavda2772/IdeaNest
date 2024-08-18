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
  imageUrl =
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80';
  description =
    "Because it's about motivating the doers. Because I&apos;m here to follow my dreams and inspire others.";
}
