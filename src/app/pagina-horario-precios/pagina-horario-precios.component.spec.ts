import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaHorarioPreciosComponent } from './pagina-horario-precios.component';

describe('PaginaHorarioPreciosComponent', () => {
  let component: PaginaHorarioPreciosComponent;
  let fixture: ComponentFixture<PaginaHorarioPreciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaHorarioPreciosComponent]
    });
    fixture = TestBed.createComponent(PaginaHorarioPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
