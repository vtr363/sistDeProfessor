import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { ProfessorService } from 'src/app/services/usuario.service';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/modelos/curso';
import { Disciplina } from 'src/app/modelos/disciplina';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatDividerModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
})

export class ProfessorCadastroComponent implements OnInit {

  tipoHorarioContratacao: string[] = ['Horista', 'Parcial', 'Integral'];
  cursosDisponiveis: Curso[] = [];
  disciplinasDoCurso: Disciplina[] = [];

  nome: string = '';
  cpf: string = '';
  tipo_horario: string = '';
  carga_semanal: number = 40;
  curso: Curso = { id: 0, curso_nome: '', disciplinas: [] };
  disciplinasSelecionadas: Disciplina[] = [];
  

  constructor(private snackBar: MatSnackBar,
              private professorService: ProfessorService, 
              private cursoService: CursoService) {}

  ngOnInit() {
    this.obterCursosDisponiveis();
  }

  // Busca dos cursos no banco.
  obterCursosDisponiveis() {
    this.cursoService.obterCursos().subscribe(
      (cursos) => {
        this.cursosDisponiveis = cursos;
      },
      (error) => {
        console.error('Erro ao obter cursos', error);
      }
    );
  }

  // Seleciona o curso no dropdown/select.
  cursoSelecionado() {
    if (this.curso) {
      this.disciplinasDoCurso = this.curso.disciplinas;
    } else {
      this.disciplinasDoCurso = [];
      this.disciplinasSelecionadas = [];
    }
  }

  // ==== ANALISAR A LÓGICA DEPOIS COM O PESSOAL ====
  // Lógica para validação da Carga Semanal baseado na escolha do tipo (Horista, Parcial ou Integral).
  validarCargaSemanal() {
    // Horista.
    if (this.tipo_horario === 'Horista' && this.carga_semanal !== null) {
      this.carga_semanal = Math.min(40, Math.max(2, this.carga_semanal));
      this.carga_semanal = this.carga_semanal - (this.carga_semanal % 2);
    
    // Parcial.
    } else if (this.tipo_horario === 'Parcial' && this.carga_semanal !== null) {
      this.carga_semanal = Math.min(40, Math.max(10, this.carga_semanal));
      this.carga_semanal = this.carga_semanal - (this.carga_semanal % 10);
    
    // Integral.
    } else if (this.tipo_horario === 'Integral') {
      this.carga_semanal = 40;
    }
  }

// Função para exibir mensagem de erro usando o MatSnackBar.
exibirMensagemErro(mensagem: string) {
  this.snackBar.open(mensagem, 'Fechar', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  });
}

  // Cadastro de Professor.
  cadastrar() {
    const novoProfessor = {
      nome: this.nome,
      cpf: this.cpf,
      tipo_horario: this.tipo_horario,
      carga_semanal: this.carga_semanal,
      curso: this.curso?.curso_nome,
      disciplinas: this.disciplinasSelecionadas.map(d => d.disciplina_nome),

    };

  // Validar o campo de nome
  if (!this.nome || this.nome.trim() === '') {
    this.exibirMensagemErro('Por favor, preencha o campo de nome.');
    return;
  }

  // Validar o campo de CPF
  if (!this.cpf || !this.validarCPF(this.cpf)) {
    this.exibirMensagemErro('Por favor, informe um CPF válido.');
    return;
  }

  // Validar o campo de Tipo de Contratação
  if (!this.tipo_horario) {
    this.exibirMensagemErro('Por favor, selecione o tipo de contratação.');
    return;
  }

  // Validar o campo de Carga Semanal
  if (this.tipo_horario === 'Horista' || this.tipo_horario === 'Parcial') {
    if (!this.carga_semanal || isNaN(this.carga_semanal) || this.carga_semanal < 2 || this.carga_semanal > 40 || this.carga_semanal % 2 !== 0) {
      this.exibirMensagemErro('Por favor, informe uma carga semanal válida para contratação Horista ou Parcial.');
      return;
    }
  }

  // Validar o campo de Curso
  if (!this.curso) {
    this.exibirMensagemErro('Por favor, selecione um curso.');
    return;
  }

  // Validar o campo de Disciplinas
  if (!this.disciplinasSelecionadas || this.disciplinasSelecionadas.length === 0) {
    this.exibirMensagemErro('Por favor, selecione pelo menos uma disciplina.');
    return;
  }

    this.professorService.adicionarProfessor(novoProfessor).subscribe(
      () => {

        this.limparCampos();

        this.snackBar.open('Cadastro realizado com sucesso.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      (error) => {
        console.error('Erro ao cadastrar professor.', error);

        // Exibir mensagem de erro
        this.snackBar.open('Erro ao cadastrar professor.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }

// Função para validar CPF.
validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');
  return cpf.length === 11;
}

  // Limpeza dos campos.
  limparCampos() {
    this.nome = '';
    this.cpf = '';
    this.tipo_horario = '';
    this.carga_semanal = 40;
    this.curso = { id: 0, curso_nome: '', disciplinas: [] };
    this.disciplinasSelecionadas = [];
    this.disciplinasDoCurso = [];

    this.snackBar.open('Os campos foram limpos.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  // Validação da Carga Semanal do Horista.
  validarCargaSemanalHorista() {
    if (this.tipo_horario === 'Horista' && this.carga_semanal !== null) {
      this.carga_semanal = Math.min(40, Math.max(2, this.carga_semanal));
      this.carga_semanal = this.carga_semanal - (this.carga_semanal % 2);
    }
  }

  // Validação da Carga Semanal do Parcial.
  validarCargaSemanalParcial() {
    if (this.tipo_horario === 'Parcial' && this.carga_semanal !== null) {
      this.carga_semanal = Math.min(40, Math.max(10, this.carga_semanal));
      this.carga_semanal = this.carga_semanal - (this.carga_semanal % 10);
    }
  }
}