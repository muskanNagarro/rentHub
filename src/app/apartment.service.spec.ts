import { TestBed } from '@angular/core/testing';
import { ApartmentService } from './apartment.service';

describe('ApartmentService', () => {
  let service: ApartmentService;

  // Mock localStorage
  const mockLocalStorage = (() => {
    let store: any;
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => store[key] = value,
      removeItem: (key: string) => delete store[key],
      clear: () => { store = {}; }
    };
  })();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentService);

    // Override localStorage with the mock
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
    // Clear localStorage mock after each test
    mockLocalStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if no apartments are stored in localStorage', () => {
    const apartments = service.getAllApartments();
    expect(apartments).toEqual([]);
  });

  it('should return the apartments stored in localStorage', () => {
    const mockApartments = [
      { id: 1, name: 'Apartment 1', location: 'Location 1' },
      { id: 2, name: 'Apartment 2', location: 'Location 2' }
    ];
    // Setting mock data in localStorage
    mockLocalStorage.setItem('apartments', JSON.stringify(mockApartments));

    const apartments = service.getAllApartments();
    expect(apartments).toEqual(mockApartments);
  });

  it('should add an apartment and store it in localStorage', () => {
    const newApartment = { id: 3, name: 'Apartment 3', location: 'Location 3' };

    // Simulate initial state in localStorage
    mockLocalStorage.setItem('apartments', JSON.stringify([
      { id: 1, name: 'Apartment 1', location: 'Location 1' }
    ]));

    service.addApartment(newApartment);

    const apartments = service.getAllApartments();
    expect(apartments.length).toBe(2);  // Should have 2 apartments now
    expect(apartments).toContain(newApartment);  // New apartment should be added
  });

  it('should handle adding an apartment when no apartments exist in localStorage', () => {
    const newApartment = { id: 1, name: 'Apartment 1', location: 'Location 1' };

    // Simulate empty localStorage
    mockLocalStorage.clear();

    service.addApartment(newApartment);

    const apartments = service.getAllApartments();
    expect(apartments.length).toBe(1);  // Should have 1 apartment now
    expect(apartments[0]).toEqual(newApartment);  // New apartment should be added
  });

  it('should overwrite localStorage when clearing apartments', () => {
    // Simulate initial state in localStorage
    const mockApartments = [
      { id: 1, name: 'Apartment 1', location: 'Location 1' },
      { id: 2, name: 'Apartment 2', location: 'Location 2' }
    ];
    mockLocalStorage.setItem('apartments', JSON.stringify(mockApartments));

    service.addApartment({ id: 3, name: 'Apartment 3', location: 'Location 3' });
    const apartments = service.getAllApartments();
    expect(apartments.length).toBe(3);  // Should have 3 apartments now
  });

  it('should not add apartment if localStorage is unavailable', () => {
    spyOn(localStorage, 'setItem').and.throwError('LocalStorage is not available');
    
    const newApartment = { id: 3, name: 'Apartment 3', location: 'Location 3' };
    
    expect(() => {
      service.addApartment(newApartment);
    }).toThrowError('LocalStorage is not available');
  });
});
