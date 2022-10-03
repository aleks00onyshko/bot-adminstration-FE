import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AdditionalLoginMethodsComponent } from '../additional-login-methods/additional-login-methods.component';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../../../store/authentication/authentication.reducer';
import { AuthenticationActions } from '../../../store/authentication/authentication.action';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AdditionalLoginMethodsComponent, CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private store: Store<AuthenticationState>) {}

  public register(): void {
    const { email, password } = this.registerForm.value;

    this.store.dispatch(AuthenticationActions.emailRegister({ email: email as string, password: password as string }));
  }
}