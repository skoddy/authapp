import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './features/feed/feed.component';

const routes: Routes = [
  {
    path: 'feed', component: FeedComponent
  },
  {
    path: '', loadChildren: './features/auth/auth.module#AuthModule'
  },
  {
  path: '', loadChildren: './features/user/user.module#UserModule'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }