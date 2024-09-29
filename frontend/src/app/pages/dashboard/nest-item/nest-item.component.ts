import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { CommonFunctionsService } from '../../../core/utility/common-functions.service';
import { ItemOperationService } from '../../../core/services/item-operation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nest-item',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './nest-item.component.html'
})
export class NestItemComponent {
  // variables
  @Input() allowAction = true;
  @Input() itemId: number = 0;
  @Input() title = '';
  @Input() url = '';
  @Input() urlImage = '';
  @Input() urlDescription = '';
  @Input() urlDomain = '';
  @Input() description = '';

  // Injectable
  commonFunctions = inject(CommonFunctionsService);
  itemOperation = inject(ItemOperationService);
  router = inject(Router);

  // Emmiter
  @Output() deleteEmitter = new EventEmitter();

  // methods
  onDeleteItem() {
    this.commonFunctions.showconfirmMessage("Nest item", "Are you sure want to delete?", "No", "Yes")
      .beforeClosed()
      .subscribe(async result => {
        if (result == 'confirm') {
          let resData = await this.itemOperation.deleteItem(this.itemId)
          if (resData.success) {
            this.commonFunctions.showSnackBar('Item Delete Successfully.')
            this.deleteEmitter.emit();
          }
        }
      })
  }

  onEditItem() {
    this.router.navigate([`update/${this.itemId}`]);
  }
}
