import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/modelos/curso';
import { Disciplina } from 'src/app/modelos/disciplina';
import { Usuario } from 'src/app/modelos/usuario';
import { CoreService } from 'src/app/services/core.service';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { EmployeeService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  profForm: FormGroup;

  curso: Curso[] = [];
  disciplinas!: Disciplina[];
  professor!: Usuario[];

  contratacao: string[] = ['Horista', 'Parcial', 'Integral'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private _coreService: CoreService,

    private cursoService: CursoService,
    private disciplinaService: DisciplinaService
  ) {
    this.profForm = this._fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],

      disciplinas: ['', Validators.required],
      contratacao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.profForm.patchValue(this.data);

    this._empService.getProfessorList().subscribe((p) => {
      this.professor = p;
    });

    this.cursoService.obterCursos().subscribe((c) => {
      this.curso = c;
    });

    this.disciplinaService.getDisciplinaList().subscribe((c) => {
      this.disciplinas = c;
    });
  }

  onFormSubmit() {
    if (this.profForm.valid) {
      if (this.data) {
        this._empService.atualizarProfessor(this.data.id, this.profForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Professor atualizado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.adicionarProfessor(this.profForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Professor adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
      // Exibir mensagens de erro específicas
      if (this.profForm.get('name')?.hasError('required')) {
        this._coreService.openSnackBar('Por favor, preencha o nome.');
      }

      if (this.profForm.get('cpf')?.hasError('required')) {
        this._coreService.openSnackBar('Por favor, preencha o CPF.');
      } else if (this.profForm.get('cpf')?.hasError('pattern')) {
        this._coreService.openSnackBar('Formato inválido de CPF.');
      }

      if (this.profForm.get('email')?.hasError('required')) {
        this._coreService.openSnackBar('Por favor, preencha o e-mail.');
      } else if (this.profForm.get('email')?.hasError('email')) {
        this._coreService.openSnackBar('Formato inválido de e-mail.');
      }

      if (this.profForm.get('disciplinas')?.hasError('required')) {
        this._coreService.openSnackBar('Por favor, selecione uma disciplina.');
      }

      if (this.profForm.get('contratacao')?.hasError('required')) {
        this._coreService.openSnackBar('Por favor, selecione o tipo de contratação.');
      }
    }
  }
}
