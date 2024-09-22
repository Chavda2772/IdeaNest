import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nest-item',
  standalone: true,
  imports: [],
  templateUrl: './nest-item.component.html'
})
export class NestItemComponent {
  @Input() title = '';
  @Input() url = '';
  @Input() urlImage = '';
  @Input() urlDescription = '';
  @Input() urlDomain = '';
  @Input() description = '';
}
