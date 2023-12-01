import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCadastroComponent } from './professor-cadastro.component';

describe('ProfessorCadastroComponent', () => {
  let component: ProfessorCadastroComponent;
  let fixture: ComponentFixture<ProfessorCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorCadastroComponent]
    });
    fixture = TestBed.createComponent(ProfessorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
