import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChildrenComponent } from './children/children.component';
import { SponsorshipComponent } from './sponsorship/sponsorship.component';

import { AuthGuard } from '../auth/auth.guard';
import {HouseholdComponent} from './household/household.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'households', component: HouseholdComponent },
          { path: 'children', component: ChildrenComponent },
          { path: 'sponsorship', component: SponsorshipComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
