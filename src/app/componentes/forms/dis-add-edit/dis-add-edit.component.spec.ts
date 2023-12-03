import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisAddEditComponent } from './dis-add-edit.component';

describe('DisAddEditComponent', () => {
  let component: DisAddEditComponent;
  let fixture: ComponentFixture<DisAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisAddEditComponent]
    });
    fixture = TestBed.createComponent(DisAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
