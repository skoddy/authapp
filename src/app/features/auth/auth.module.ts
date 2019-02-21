import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [RegisterComponent]
})
export class AuthModule { }
