import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PladurComponent } from './pladur.component';

describe('PladurComponent', () => {
  let component: PladurComponent;
  let fixture: ComponentFixture<PladurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PladurComponent]
    });
    fixture = TestBed.createComponent(PladurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
