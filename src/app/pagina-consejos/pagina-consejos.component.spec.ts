import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaConsejosComponent } from './pagina-consejos.component';

describe('PaginaConsejosComponent', () => {
  let component: PaginaConsejosComponent;
  let fixture: ComponentFixture<PaginaConsejosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaConsejosComponent]
    });
    fixture = TestBed.createComponent(PaginaConsejosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
