import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoordenadorComponent } from './view-coordenador.component';

describe('ViewCoordenadorComponent', () => {
  let component: ViewCoordenadorComponent;
  let fixture: ComponentFixture<ViewCoordenadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCoordenadorComponent]
    });
    fixture = TestBed.createComponent(ViewCoordenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
