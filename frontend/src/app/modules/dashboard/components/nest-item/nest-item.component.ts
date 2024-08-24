import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nest-item',
  standalone: true,
  imports: [],
  templateUrl: './nest-item.component.html',
  styleUrl: './nest-item.component.css',
})
export class NestItemComponent {
  @Input() title = 'UI/UX Review Check';
  @Input() url = 'https://www.google.com/';
  @Input() imageUrl = '';
  @Input() description =
    'crablike campus sulfide legislate alarm enigmatic emerald exciting policy silenced enable vocalize';
}
