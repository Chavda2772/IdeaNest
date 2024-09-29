import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  IsUpdate: boolean = false;
  Title: string = "Add Collection";
  CollectionId: number = 0;
  CollectionName: string = "";
  CollectionParentId: number | null = null;

  // Events
  ngOnInit(): void {
    this.IsUpdate = this.data.IsUpdate ?? false;
    this.Title = this.data.IsUpdate ? "Update Collection" : "Add Collection";
    this.CollectionId = this.data.CollectoinId;
    this.CollectionName = this.data.CollectionName;
    this.CollectionParentId = this.data.CollectionParentId || null;
  }

  // Methods
  async onSave() {
    // validate
    if (!this.CollectionName) {
      this.commonFunctionsService.showSnackBar("Collection Name is required.")
      return;
    }

    // Update collection
    if (this.IsUpdate) {
      let resData = await this.collectionService.updateCollection(this.CollectionId, this.CollectionName);
      if (resData.success) {
        this.commonFunctionsService.showSnackBar("Collection updated successfully.")
        this.dialogRef.close(this.CollectionName);
      }
      return;
    }

    // Add Collection
    let data = await this.collectionService.addCollection(this.CollectionName, this.CollectionParentId);
    if (data.success) {
      this.commonFunctionsService.showSnackBar("Collection added successfully.")
      this.onClose(true)
    }
  }
  onClose(isSuccess: boolean = false) {
    this.dialogRef.close(isSuccess);
  }

}
