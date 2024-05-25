import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSeleccionTestComponent } from './pagina-seleccion-test.component';

describe('PaginaSeleccionTestComponent', () => {
  let component: PaginaSeleccionTestComponent;
  let fixture: ComponentFixture<PaginaSeleccionTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaSeleccionTestComponent]
    });
    fixture = TestBed.createComponent(PaginaSeleccionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
