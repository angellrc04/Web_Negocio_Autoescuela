import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPreguntasRespuestasComponent } from './pagina-preguntas-respuestas.component';

describe('PaginaPreguntasRespuestasComponent', () => {
  let component: PaginaPreguntasRespuestasComponent;
  let fixture: ComponentFixture<PaginaPreguntasRespuestasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaPreguntasRespuestasComponent]
    });
    fixture = TestBed.createComponent(PaginaPreguntasRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
