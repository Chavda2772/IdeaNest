import { Component, inject, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AddUpdateFolderComponent } from '../add-update-folder/add-update-folder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nest-folder',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './nest-folder.component.html'
})
export class NestFolderComponent {
  // Inject 
  router = inject(Router);
  metDialogAdd = inject(MatDialog);

  // variables
  @Input() CollectionId: Number = 0;
  @Input() CollectionName: String = '';

  // Methods
  onCollectionClick() {
    this.router.navigate(['dashboard' + "/" + this.CollectionId])
  }

  onEditClick() {
    this.metDialogAdd.open(AddUpdateFolderComponent, {
      width: '500px',
      data: {
        IsUpdate: true,
        CollectoinId: this.CollectionId,
        CollectionName: this.CollectionName,
      },
    }).beforeClosed().subscribe((name) => {
      this.CollectionName = name;
    });
  }
}
