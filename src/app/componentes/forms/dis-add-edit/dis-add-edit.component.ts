import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/modelos/curso';
import { CoreService } from 'src/app/services/core.service';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-dis-add-edit',
  templateUrl: './dis-add-edit.component.html',
  styleUrls: ['./dis-add-edit.component.css']
})
export class DisAddEditComponent implements OnInit {
  disciplinaForm: FormGroup;

  cursos!: Curso[];

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<DisAddEditComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,

    private _coreService: CoreService,
    private cursoService: CursoService,
    private _disService: DisciplinaService,

  ) {
    this.disciplinaForm = this._fb.group({
      disciplina_nome: ['', Validators.required],
      disciplina_carga: ['', [Validators.required, this.valorNegativo]],
      cursos: ['', Validators.required],
        });
  }

  ngOnInit(): void {
    this.cursoService.obterCursos().subscribe(c => {
      this.cursos = c;
    });
  }

  valorNegativo(control: AbstractControl): { [key: string]: boolean } | null {
    const carga = control.value;

    if (carga !== null && carga < 0) {
      return { 'negativeValue': true };
    }

    return null;
  }

  onFormSubmit() {
    if (this.disciplinaForm.valid) {
      if (this.data) {
        this._disService
          .atualizarDisciplina(this.data.id, this.disciplinaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'Disciplina atualizada com sucesso!'
              );
              console.log(this.data);
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._disService
          .adicionarDisciplina(this.disciplinaForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'Disciplina adicionada com sucesso!'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } 
    } else {
        if (this.disciplinaForm.get('disciplina_nome')?.hasError('required')) {
          this._coreService.openSnackBar('Por favor, preencha da disciplina.');
        }

        if (this.disciplinaForm.get('disciplina_carga')?.hasError('required')) {
          this._coreService.openSnackBar('Por favor, preencha a carga horária.');
        }

        if (this.disciplinaForm.get('cursos')?.hasError('required')) {
          this._coreService.openSnackBar('Por favor, selecione um curso.');
      }
        if (this.disciplinaForm.get('disciplina_carga')?.hasError('negativeValue')) {
          this._coreService.openSnackBar('A carga horária não pode ser um valor negativo.');
      }
    }
  }
}

