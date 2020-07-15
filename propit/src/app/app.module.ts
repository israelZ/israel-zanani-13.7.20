import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { TasksComponent } from './component/tasks/tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { DialogNewComponent } from './component/dialog-new/dialog-new.component';
import { DialogEditComponent } from './component/dialog-edit/dialog-edit.component';
import { DialogSeeComponent } from './component/dialog-see/dialog-see.component';
import { UserComponent } from './component/user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    DialogNewComponent,
    DialogEditComponent,
    DialogSeeComponent,
    UserComponent
  ],
  entryComponents : [
    DialogNewComponent,
    DialogEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
