import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorCadastroComponent } from './componentes/professor-cadastro/professor-cadastro.component';

const routes: Routes = [

  {path:'registro', component:ProfessorCadastroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
