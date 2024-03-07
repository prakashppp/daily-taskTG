import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolodtedDataComponent } from './consolodted-data.component';

describe('ConsolodtedDataComponent', () => {
  let component: ConsolodtedDataComponent;
  let fixture: ComponentFixture<ConsolodtedDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolodtedDataComponent]
    });
    fixture = TestBed.createComponent(ConsolodtedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
