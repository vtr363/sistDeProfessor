import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorCadastroComponent } from './componentes/professor-cadastro/professor-cadastro.component';
import { ViewCoordenadorComponent } from './componentes/view/view-coordenador/view-coordenador.component';

const routes: Routes = [

  {path:'registro', component:ProfessorCadastroComponent},
  {path:'coordenador', component:ViewCoordenadorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
