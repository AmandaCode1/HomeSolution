import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoComponent } from './contactos.component';

describe('ContactosComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoComponent]
    });
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
