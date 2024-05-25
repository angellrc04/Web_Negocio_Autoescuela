import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTestMedioComponent } from './pagina-test-medio.component';

describe('PaginaTestMedioComponent', () => {
  let component: PaginaTestMedioComponent;
  let fixture: ComponentFixture<PaginaTestMedioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaTestMedioComponent]
    });
    fixture = TestBed.createComponent(PaginaTestMedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
