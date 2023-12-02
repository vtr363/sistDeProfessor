import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursAddEditComponent } from './curs-add-edit.component';

describe('CursAddEditComponent', () => {
  let component: CursAddEditComponent;
  let fixture: ComponentFixture<CursAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursAddEditComponent]
    });
    fixture = TestBed.createComponent(CursAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
