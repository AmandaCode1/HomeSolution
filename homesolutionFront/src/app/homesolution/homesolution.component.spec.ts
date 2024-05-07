import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesolutionComponent } from './homesolution.component';

describe('HomesolutionComponent', () => {
  let component: HomesolutionComponent;
  let fixture: ComponentFixture<HomesolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomesolutionComponent]
    });
    fixture = TestBed.createComponent(HomesolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
