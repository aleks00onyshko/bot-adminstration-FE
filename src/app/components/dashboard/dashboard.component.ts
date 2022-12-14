import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../../store/authentication/authentication.reducer';
import { AuthenticationActions } from '../../store/authentication/authentication.action';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CreateShopDialogResult, CreateStoreDialogComponent } from './create-store-dialog/create-store-dialog.component';
import { map, take } from 'rxjs';
import { DashboardStore } from './dashboard.store';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatCardModule, MatDialogModule, SpinnerComponent, RouterModule],
  providers: [DashboardStore],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<AuthenticationState>, private dialog: MatDialog, public dashboardStore: DashboardStore) {}

  public ngOnInit(): void {
    this.dashboardStore.getShops();
  }

  public logout(): void {
    this.store.dispatch(AuthenticationActions.logout());
  }

  public openCreateBotDialog(): void {
    this.dialog
      .open(CreateStoreDialogComponent, { width: '38vw' })
      .afterClosed()
      .pipe(take(1))
      .subscribe((res: CreateShopDialogResult | null) => {
        if (res) {
          this.dashboardStore.createShop(res);
        }
      });
  }
}
