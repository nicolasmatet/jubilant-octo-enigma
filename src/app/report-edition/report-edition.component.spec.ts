import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEditionComponent } from './report-edition.component';

describe('ReportEditionComponent', () => {
  let component: ReportEditionComponent;
  let fixture: ComponentFixture<ReportEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
