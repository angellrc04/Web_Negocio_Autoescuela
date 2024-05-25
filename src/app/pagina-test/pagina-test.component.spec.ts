import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTestComponent } from './pagina-test.component';

describe('PaginaTestComponent', () => {
  let component: PaginaTestComponent;
  let fixture: ComponentFixture<PaginaTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaTestComponent]
    });
    fixture = TestBed.createComponent(PaginaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
