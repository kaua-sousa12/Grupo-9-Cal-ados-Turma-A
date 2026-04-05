import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasPorMarca } from './vendas-por-marca';

describe('VendasPorMarca', () => {
  let component: VendasPorMarca;
  let fixture: ComponentFixture<VendasPorMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasPorMarca],
    }).compileComponents();

    fixture = TestBed.createComponent(VendasPorMarca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
