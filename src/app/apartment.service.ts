import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor() {}

  getAllApartments() {
    return JSON.parse(localStorage.getItem('apartments') || '[]');
  }

  addApartment(apartment: any) {
    const apartments = JSON.parse(localStorage.getItem('apartments') || '[]');
    apartments.push(apartment);
    localStorage.setItem('apartments', JSON.stringify(apartments));
  }
}
