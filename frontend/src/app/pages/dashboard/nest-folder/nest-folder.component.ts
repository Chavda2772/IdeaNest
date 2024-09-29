import { Component, inject, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nest-folder',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './nest-folder.component.html'
})
export class NestFolderComponent {
  // Inject 
  router = inject(Router);

  // variables
  @Input() CollectionId: Number = 0;
  @Input() CollectionName: String = '';

  // Methods
  onCollectionClick() {
    this.router.navigate(['dashboard' + "/" + this.CollectionId])
  }
}
