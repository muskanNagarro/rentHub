import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { ApartmentService } from './apartment.service';

describe('AppModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the module', () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  it('should provide ApartmentService', () => {
    const service = TestBed.inject(ApartmentService);
    expect(service).toBeTruthy();
  });
});
