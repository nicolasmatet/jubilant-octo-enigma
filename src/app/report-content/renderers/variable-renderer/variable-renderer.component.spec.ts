import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableRendererComponent } from './variable-renderer.component';

describe('VariableRendererComponent', () => {
  let component: VariableRendererComponent;
  let fixture: ComponentFixture<VariableRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
