import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { ToolbarBasicExample } from './components/toolbar/toolbar-basic-example';
import { SideNav } from './components/sidenav/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { CollaborateurComponent } from './components/collaborateur/collaborateur.component';
import { NgChartsModule } from 'ng2-charts';
import { ProjetsComponent } from './components/projets/projets.component';

@NgModule({
  declarations: [SideNav, ToolbarBasicExample, CollaborateurComponent, ProjetsComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [SideNav],
})
export class AppModule {}
