import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRendrerComponent } from './text-rendrer.component';

describe('TextRendrerComponent', () => {
  let component: TextRendrerComponent;
  let fixture: ComponentFixture<TextRendrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextRendrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRendrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
