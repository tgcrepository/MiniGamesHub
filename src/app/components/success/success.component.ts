import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  template: `
    <h1>Success!</h1>
    <p>Login Successful</p>
    <button mat-button (click)="closeDialog()">Close</button>
  `,
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  constructor(public dialogRef: MatDialogRef<any>) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
