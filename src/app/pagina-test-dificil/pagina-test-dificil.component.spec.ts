import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTestDificilComponent } from './pagina-test-dificil.component';

describe('PaginaTestMedioComponent', () => {
  let component: PaginaTestDificilComponent;
  let fixture: ComponentFixture<PaginaTestDificilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaTestDificilComponent]
    });
    fixture = TestBed.createComponent(PaginaTestDificilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
