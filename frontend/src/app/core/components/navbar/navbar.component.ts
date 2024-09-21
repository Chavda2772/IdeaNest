import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() Title = ''
}
