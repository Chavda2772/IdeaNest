import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}
  
  onHomeClick() {
    this.router.navigate(['dashboard']);
  }
}
