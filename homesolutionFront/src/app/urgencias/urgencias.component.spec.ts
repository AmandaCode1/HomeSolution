import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgenciasComponent } from './urgencias.component';

describe('UrgenciasComponent', () => {
  let component: UrgenciasComponent;
  let fixture: ComponentFixture<UrgenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrgenciasComponent]
    });
    fixture = TestBed.createComponent(UrgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
