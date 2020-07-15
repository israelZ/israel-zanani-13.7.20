import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { TasksComponent } from './component/tasks/tasks.component';

const routes: Routes = [
  {path: '',  redirectTo: 'home',pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'task',component:TasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
