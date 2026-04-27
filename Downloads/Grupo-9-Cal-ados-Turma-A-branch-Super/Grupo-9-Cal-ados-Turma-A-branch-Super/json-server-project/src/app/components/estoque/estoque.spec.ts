import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueComponente } from './estoque';

describe('Estoque', () => {
  let component: EstoqueComponente;
  let fixture: ComponentFixture<EstoqueComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(EstoqueComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
