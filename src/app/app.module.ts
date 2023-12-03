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
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';

import { CursoService } from './services/curso.service';
import { ViewCoordenadorComponent } from './componentes/view/view-coordenador/view-coordenador.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewCoordenadorComponent,
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
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [CursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
