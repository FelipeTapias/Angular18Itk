import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialFormComponent } from './pages/initial-form/initial-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'ingresar-usuario/:session', component: InitialFormComponent },
      { path: '**', redirectTo: 'ingresar-usuario/:session' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserRotuingModule { }
