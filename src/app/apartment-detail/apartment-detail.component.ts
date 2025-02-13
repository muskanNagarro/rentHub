// apartment-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  standalone: false,
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {
  apartmentId: number = 0;
  apartment: any;
  newComment: string = '';
  isLoggedIn: boolean = false;
  
  apartments: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedIn = currentUser !== null;

    // Retrieve the apartment data from localStorage
    this.apartments = JSON.parse(localStorage.getItem('apartments') || '[]');
    
    // Get the apartment ID from the route parameter
    this.apartmentId = +this.route.snapshot.paramMap.get('id')!;
    
    // Find the apartment by its ID
    this.apartment = this.apartments.find(apartment => apartment.id === this.apartmentId);
  }

  addComment(): void {
    if (this.newComment.trim()) {
      // Add the new comment to the apartment's comment list
      this.apartment.comments.push(this.newComment.trim());
      
      // Save the updated apartment list back to localStorage
      const updatedApartments = this.apartments.map(apartment => 
        apartment.id === this.apartment.id ? this.apartment : apartment
      );
      localStorage.setItem('apartments', JSON.stringify(updatedApartments));

      // Clear the new comment input
      this.newComment = '';
    } else {
      alert('Comment cannot be empty!');
    }
  }

  // Navigate back to the home page
  goBack(): void {
    this.router.navigate(['/']); // Navigate to the home page (route path '/')
  }
}
