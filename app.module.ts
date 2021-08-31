import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { TestComponent } from './test/test.component';
import { StartComponent } from './start/start.component';
import { NameComponent } from './name/name.component';
import { Test2Component } from './test2/test2.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOverview1Component } from './dialog-overview1/dialog-overview1.component';
import { DialogOverview2Component } from './dialog-overview2/dialog-overview2.component';
import { DialogOverview3Component } from './dialog-overview3/dialog-overview3.component';
import { DialogOverview4Component } from './dialog-overview4/dialog-overview4.component';
import { DialogOverview5Component } from './dialog-overview5/dialog-overview5.component';


const appRoutes: Routes = [
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    StartComponent,
    NameComponent,
    Test2Component,
    DialogOverviewComponent,
    DialogOverview1Component,
    DialogOverview2Component,
    DialogOverview3Component,
    DialogOverview4Component,
    DialogOverview5Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot(
      appRoutes
      ),
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})


 
export class AppModule { }
