import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdditionalLoginMethodsComponent } from '../additional-login-methods/additional-login-methods.component';
import { AuthenticationState } from '../../../store/authentication/authentication.reducer';
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '../../../store/authentication/authentication.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AdditionalLoginMethodsComponent, CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private store: Store<AuthenticationState>) {}

  public login(): void {
    const { email, password } = this.loginForm.value;

    this.store.dispatch(AuthenticationActions.emailLogin({ email: email as string, password: password as string }));
  }
}
