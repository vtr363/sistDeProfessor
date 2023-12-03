import { Component, OnInit, ViewChild } from '@angular/core';
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
import { EmployeeService } from 'src/app/services/usuario.service';

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
    'trimestre',
    'action',
  ];
  
  cursoSelecionado = '';
  profSelecionado: Usuario[] = [];
  filtroCurso: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<any>;


  disciplinaList: Disciplina[] = [];
  CursoList: Curso[] = [];
  professoresList: Usuario[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _discService: DisciplinaService,
    private _coreService: CoreService,
    private _cursoService: CursoService,
    private _professorService: EmployeeService,
      ) {}

  ngOnInit(): void {
    this.getCursoList();
    this.getProfessoresList();
  }

  onSelectChange(row: any): void {
    // Access the selected professor and the entire row data
    console.log('Selected Professor:', row.selectedProfessor);
    console.log('Entire Row Data:', row);
  
    // You can perform any further actions or logic here
  }


  getCursoList() {
    this._cursoService.obterCursos().subscribe({
      next: (res) => {
        this.CursoList = res
        this.getDisciplinaList(this.CursoList[0].curso_nome)
      },
      error: console.log,
    });
  }

  getDisciplinaList(curso_nome: string) {
    const curso: Curso | undefined = this.CursoList.find(c => c.curso_nome == curso_nome)
    console.log(curso);
    
    this.cursoSelecionado = curso?.curso_nome ?? "";
    this.disciplinaList = curso?.disciplinas ?? [];
    
    this.dataSource = new MatTableDataSource(this.disciplinaList);
    this.dataSource.sort = this.sort;
    this.dataSource._renderChangesSubscription;
  }

  getProfessoresList() {
    this._professorService.getProfessorList().subscribe({
      next: (res) => {
        this.professoresList = res.filter((professor: { tipo: string; }) => professor.tipo === "Professor")
      },
      error: console.log,
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroCurso(curso_nome: string) {
    this.getDisciplinaList(curso_nome)
  
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
}