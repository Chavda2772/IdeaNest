import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionOperationService } from '../../../core/services/collection-operation.service';
import { CommonFunctionsService } from '../../../core/utility/common-functions.service';

@Component({
  selector: 'app-add-update-folder',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule],
  templateUrl: './add-update-folder.component.html'
})
export class AddUpdateFolderComponent implements OnInit {
  // Inject
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  dialogRef = inject(MatDialogRef<AddUpdateFolderComponent>);
  collectionService = inject(CollectionOperationService);
  commonFunctionsService = inject(CommonFunctionsService);

  // Data
  Title: string = "Add Collection";
  CollectionId: Number = 0;
  CollectionName: string = "";
  CollectionParentId: Number | null = null;

  // Events
  ngOnInit(): void {
    this.Title = !!this.data.CollectoinId ? "Update Collection" : "Add Collection";
    this.CollectionId = this.data.CollectoinId;
    this.CollectionName = this.data.CollectionName;
    this.CollectionParentId = this.data.CollectionParentId || null;
  }

  // Methods
  async onSave() {
    let data = await this.collectionService.addCollection(this.CollectionName, this.CollectionParentId);
    if (data.success) {
      this.commonFunctionsService.showSnackBar("Collection Added successfully.")
      this.onClose()
    }
  }
  onClose() {
    this.dialogRef.close();
  }

}
