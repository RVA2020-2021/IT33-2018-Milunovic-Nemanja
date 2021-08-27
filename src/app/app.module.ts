import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmerComponent } from './components/smer/smer.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { StudentComponent } from './components/student/student.component';
import { GrupaComponent } from './components/grupa/grupa.component';


@NgModule({
  declarations: [
    AppComponent,
    SmerComponent,
    ProjekatComponent,
    StudentComponent,
    GrupaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
