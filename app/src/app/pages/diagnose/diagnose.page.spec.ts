import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosePage } from './diagnose.page';

describe('DiagnosePage', () => {
  let component: DiagnosePage;
  let fixture: ComponentFixture<DiagnosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
