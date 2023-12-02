import { Component, OnInit, ViewChild } from '@angular/core';
import { CursAddEditComponent } from '../../forms/curs-add-edit/curs-add-edit.component';
import { DisAddEditComponent } from '../../forms/dis-add-edit/dis-add-edit.component';
import { EmpAddEditComponent } from '../../forms/emp-add-edit/emp-add-edit.component';
import { Usuario } from 'src/app/modelos/usuario';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Disciplina } from 'src/app/modelos/disciplina';
import { CoreService } from 'src/app/services/core.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/modelos/curso';

@Component({
  selector: 'app-view-coordenador',
  templateUrl: './view-coordenador.component.html',
  styleUrls: ['./view-coordenador.component.css']
})
export class ViewCoordenadorComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'disciplina_nome',
    'disciplina_carga',
    'cursos',
    'trimestre',
    'action',
  ];
  professores: Usuario[] = [];
  cursoSelecionado = '';
  profSelecionado: any;
  filtroCurso: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<any>;
  disciplinaList: Disciplina[] = [];
  CursoList: Curso[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _discService: DisciplinaService,
    private _coreService: CoreService,
    private _cursoService: CursoService
      ) {}

  ngOnInit(): void {
    this.getCursoList();


  }

  abrirAddEditProfForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDisciplinaList(this.cursoSelecionado);
        }
      },
    });
  }

  abrirAddEditDiscForm() {
    const dialogRef = this._dialog.open(DisAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  abrirAddEditCursForm() {
    const dialogRef = this._dialog.open(CursAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  getCursoList() {
    this._discService.getDisciplinaList().subscribe({
      next: (res) => {
        this.CursoList = res
      },
      error: console.log,
    });
  }

  getDisciplinaList(curso_nome: string) {
    if (this.CursoList) {

      const curso: Curso | undefined = this.CursoList.find(c => c.curso_nome = curso_nome)
      this.cursoSelecionado = curso?.curso_nome ?? "";
      this.disciplinaList = curso?.disciplinas ?? [];
    }
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroCurso() {
    const filterValue = this.filtroCurso.value.toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletarDisciplina(id: number) {
    this._discService.deletarDisciplina(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Disciplina removida!', 'done');
        this.getDisciplinaList(this.cursoSelecionado);
      },
      error: console.log,
    });
  }

  abrirEditForm(data: any) {
    const dialogRef = this._dialog.open(DisAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDisciplinaList(this.cursoSelecionado);
        }
      },
    });
  }
}