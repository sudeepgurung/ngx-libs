import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMitiComponent } from './ngx-miti.component';

describe('NgxMitiComponent', () => {
  let component: NgxMitiComponent;
  let fixture: ComponentFixture<NgxMitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMitiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxMitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
