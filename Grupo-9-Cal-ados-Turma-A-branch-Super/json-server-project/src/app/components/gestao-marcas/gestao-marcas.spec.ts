import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoMarcas } from './gestao-marcas';

describe('GestaoMarcas', () => {
  let component: GestaoMarcas;
  let fixture: ComponentFixture<GestaoMarcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoMarcas],
    }).compileComponents();

    fixture = TestBed.createComponent(GestaoMarcas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
