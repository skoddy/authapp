import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    data: { title: 'Profile' }
  }
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
