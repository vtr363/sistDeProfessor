import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfessorCadastroComponent } from './componentes/professor-cadastro/professor-cadastro.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule }  from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { CursoService } from './services/curso.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    ProfessorCadastroComponent,

    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [CursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
