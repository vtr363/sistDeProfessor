import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disciplina } from 'src/app/modelos/disciplina';
import { Usuario } from 'src/app/modelos/usuario';
import { CoreService } from 'src/app/services/core.service';
import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-curs-add-edit',
  templateUrl: './curs-add-edit.component.html',
  styleUrls: ['./curs-add-edit.component.css']
})
export class CursAddEditComponent implements OnInit {
  cursoForm: FormGroup;

  usuario_coordenador!: Usuario;
  disciplinas!: Disciplina[];

  trimestres: string[] = ['1', '2', '3', '4'];

  constructor(
    private _fb: FormBuilder,
    private _curService: CursoService,
    private _dialogRef: MatDialogRef<CursAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private disciplinaService: DisciplinaService
  ) {
    this.cursoForm = this._fb.group({
      curso_nome: ['', [Validators.required]],
      trimestre: ['', Validators.required],
      usuario_coordenador: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.disciplinaService.getDisciplinaList().subscribe(c => {
      this.disciplinas = c;
    });
  }
  onFormSubmit() {
    
    if (this.cursoForm.valid) {
      if (this.data) {
        this._curService
          .atualizarCurso(this.data.id, this.cursoForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Curso atualizado com sucesso!');
              console.log(this.data);
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._curService.adicionarCurso(this.cursoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Curso adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
        if (this.cursoForm.get('curso_nome')?.hasError('required')) {
          this._coreService.openSnackBar('Por favor, preencha do curso.');
        }

        if (this.cursoForm.get('trimestre')?.hasError('required')) {
          this._coreService.openSnackBar('Por favor, selecione o trimestre.');
        }

        if (this.cursoForm.get('usuario_coordenador')?.hasError('required')) {
          this._coreService.openSnackBar('Por favor, preencha o nome do coordenador.');
      }
    }
  }
}

