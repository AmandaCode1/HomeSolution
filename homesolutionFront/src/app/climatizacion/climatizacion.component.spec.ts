import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimatizacionComponent } from './climatizacion.component';

describe('ClimatizacionComponent', () => {
  let component: ClimatizacionComponent;
  let fixture: ComponentFixture<ClimatizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClimatizacionComponent]
    });
    fixture = TestBed.createComponent(ClimatizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
