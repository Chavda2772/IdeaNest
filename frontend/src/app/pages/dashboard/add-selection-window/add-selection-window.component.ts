import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AddUpdateComponent } from '../../add-update/add-update.component';
import { AddUpdateFolderComponent } from '../add-update-folder/add-update-folder.component';

@Component({
  selector: 'app-add-selection-window',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule],
  templateUrl: './add-selection-window.component.html'
})
export class AddSelectionWindowComponent {
  // Inject
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  metDialogSelection = inject(MatDialogRef<AddSelectionWindowComponent>);
  metDialogAdd = inject(MatDialog);
  router = inject(Router);

  // variables
  CollectionParentId: number | undefined;

  // Events
  onCollectionClick() {
    this.metDialogAdd.open(AddUpdateFolderComponent, {
      width: '500px',
      data: {
        CollectoinId: this.data.CollectoinId,
        CollectionName: this.data.CollectionName,
        CollectionParentId: this.data.CollectionParentId,
      },
    }).beforeClosed().subscribe((success) => {
      if (success)
        this.metDialogSelection.close();
    });
  }
  onNestItemClick() {
    let path = 'add' + (this.data.CollectionParentId ? `/${this.data.CollectionParentId}` : '');
    this.router.navigate([path]);
    this.onClose()
  }
  onClose() {
    this.metDialogSelection.close();
  }
}
