import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConChildComponent } from './con-child.component';

describe('ConChildComponent', () => {
  let component: ConChildComponent;
  let fixture: ComponentFixture<ConChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConChildComponent]
    });
    fixture = TestBed.createComponent(ConChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
