import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AddUpdateFolderComponent } from '../add-update-folder/add-update-folder.component';
import { MatDialog } from '@angular/material/dialog';
import { CollectionOperationService } from '../../../core/services/collection-operation.service';
import { CommonFunctionsService } from '../../../core/utility/common-functions.service';

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
  collectionOperation = inject(CollectionOperationService);
  commonFunctions = inject(CommonFunctionsService);

  // variables
  @Input() CollectionId: number = 0;
  @Input() CollectionName: string = '';

  // Emitter
  @Output() refreshDetail = new EventEmitter();

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

  async onDeleteClick() {
    this.commonFunctions.showconfirmMessage("Collection", "Are you sure want to delete collection?", "No", "Yes")
      .beforeClosed()
      .subscribe(async (result: string) => {
        if (result == 'confirm') {
          await this.collectionOperation.deleteCollection(this.CollectionId);
          this.commonFunctions.showSnackBar('Collection deleted successfully.')
          this.refreshDetail.emit();
        }
      })
  }
}
