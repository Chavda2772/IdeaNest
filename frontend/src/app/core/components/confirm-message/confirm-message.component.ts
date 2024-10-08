import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-confirm-message',
  standalone: true,
  imports: [MatDialogClose, MatDialogContent, MatFormFieldModule, FormsModule, MatButtonModule, MatDialogActions],
  templateUrl: './confirm-message.component.html'
})
export class ConfirmMessageComponent {
  // Injectables
  readonly data = inject<ConfirmMessageComponent>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmMessageComponent>);

  // Variables
  title: string = this.data.title;
  msg: string = this.data.msg;
  cancelText: string = this.data.cancelText ?? "Cancel";
  confirmText: string = this.data.confirmText ?? "Confirm";

  // Methods
  onClose() {
    this.dialogRef.close('cancel');
  }
  onConfirmClick() {
    this.dialogRef.close('confirm');
  }
}
