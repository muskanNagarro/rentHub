import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  searchTerm: string = '';
  carouselImages: string[] = [
    '/assets/images/apartment4.jpg', 
    '/assets/images/apartment5.jpg', 
    '/assets/images/apartment6.jpg',
    '/assets/images/apartment1.jpg', 
    '/assets/images/apartment2.jpg', 
    '/assets/images/apartment3.jpg'
  ];
  apartments = [
    {
      id: 1,
      title: 'Luxury Apartment',
      description: 'Spacious 2 bedroom apartment in the city. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
      image: '/assets/images/apartment4.jpg',
      location: 'City Center',
      comments: ['Great apartment, love the location!', 'Very spacious and modern.']
    },
    {
      id: 2,
      title: 'Modern Studio',
      description: 'Affordable studio near the beach. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
      image: '/assets/images/apartment2.jpg',
      location: 'Beachside',
      comments: ['Perfect place for a weekend getaway!']
    },
    {
      id: 3,
      title: 'Cozy Flat',
      description: 'A cozy flat in a quiet neighborhood. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
      image: '/assets/images/apartment6.jpg',
      location: 'Suburb',
      comments: []
    }
  ];
  
  filteredApartments: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private router: Router, private apartmentService: ApartmentService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('currentUser');  // Check if user is logged in
    this.filteredApartments = [...this.apartments];
    localStorage.setItem('apartments', JSON.stringify(this.apartments));
  }

  filterApartments(): void {
    if (!this.searchTerm) {
      this.filteredApartments = [...this.apartments];
    } else {
      this.filteredApartments = this.apartments.filter(apartment => 
        apartment.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  viewDetails(apartment: any): void {
    // Redirect to apartment detail page
    console.log(apartment);
    this.router.navigate(['/apartment-detail', apartment.id]);
  }

  markFavorite(apartment: any): void {
    alert(`${apartment.title} has been marked as your favorite!`);
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(apartment);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // You can implement further logic for storing favorites, e.g., localStorage or a service
  }

  addApartment(): void {
    // Redirect to add apartment page if the user is logged in
    this.router.navigate(['/add-apartment']);
  }
}
