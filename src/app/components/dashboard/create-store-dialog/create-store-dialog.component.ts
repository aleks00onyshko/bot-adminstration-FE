import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { CreateBotInstructionsComponent } from './create-bot-instructions/create-bot-instructions.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-store-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    CreateBotInstructionsComponent,
    HttpClientModule
  ],
  templateUrl: './create-store-dialog.component.html',
  styleUrls: ['./create-store-dialog.component.scss']
})
export class CreateStoreDialogComponent {
  public createStoreForm = new FormGroup({
    botToken: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    shopName: new FormControl<string>('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<CreateStoreDialogComponent>) {}

  public createStore(): void {
    const { botToken, shopName } = this.createStoreForm.value;

    this.dialogRef.close({ botToken: botToken as string, shopName: shopName as string } as CreateShopDialogResult);
  }
}

export interface CreateShopDialogResult {
  botToken: string;
  shopName: string;
}
