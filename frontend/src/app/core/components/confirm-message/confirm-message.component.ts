import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-message',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.css'
})
export class ConfirmMessageComponent {
  // Injectables
  readonly data = inject<ConfirmMessageComponent>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmMessageComponent>);

  // Variables
  title: string = this.data.title;
  msg: string = this.data.msg;
  cancelText: string = this.data.cancelText ?? "Cancel";
  okText: string = this.data.okText ?? "Ok";

  // Methods
  onClose() {
    this.dialogRef.close();
  }
  onOkClick() {
    console.warn('Method not implemented.');
  }

}
