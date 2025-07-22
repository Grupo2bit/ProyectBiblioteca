import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudSolicitudPrestamoComponent } from './crud-solicitud-prestamo';

describe('CrudSolicitudPrestamoComponent', () => {
  let component: CrudSolicitudPrestamoComponent;
  let fixture: ComponentFixture<CrudSolicitudPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudSolicitudPrestamoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudSolicitudPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
