import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';


describe('Dashboard', () => {
  let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [DashboardComponent]
  }).compileComponents();

  fixture = TestBed.createComponent(DashboardComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
