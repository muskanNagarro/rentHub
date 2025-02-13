// add-apartment.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  standalone: false,
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent implements OnInit {
  apartmentForm: FormGroup;
  amenitiesList: string[] = [
    'Gym/Fitness Corner', 'Power Backup', 'Plant Security System', 'Swimming Pool',
    'Garbage Disposal', 'Laundry Service', 'Car Park', 'Private Lawn', 'Elevator', 
    'Visitors Parking', 'Water Heater', 'Club House'
  ];
  // Map to store sanitized control names
  amenitiesControlNames: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private router: Router) {
     // Create an empty FormGroup
     const amenitiesControls: { [key: string]: FormControl } = {};

     // Loop through the amenitiesList and create a FormControl for each
     this.amenitiesList.forEach((amenity) => {
       const controlName = amenity.toLowerCase().replace(/\s+/g, ''); // sanitize the amenity name
       amenitiesControls[controlName] = new FormControl(false);  // Default value for checkbox is false (unchecked)
       this.amenitiesControlNames[amenity] = controlName; // Store sanitized names for reference in template
     });
    this.apartmentForm = this.fb.group({
      propertyType: ['', Validators.required],
      buildingName: ['', Validators.required],
      sharedProperty: ['', Validators.required],
      location: ['', Validators.required],
      squareFeet: ['', [Validators.required, Validators.min(1)]],
      leaseType: ['', Validators.required],
      expectedRent: ['', [Validators.required, Validators.min(1)]],
      negotiable: [false],
      priceMode: ['', Validators.required],
      furnished: ['', Validators.required],
      amenities: this.fb.group(amenitiesControls),
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.apartmentForm.valid) {
      console.log('Form Submitted', this.apartmentForm.value);
      const apartmentData = this.apartmentForm.value;

      // Save the apartment data in localStorage
      const apartments = JSON.parse(localStorage.getItem('apartments') || '[]');
      apartments.push(apartmentData);
      localStorage.setItem('apartments', JSON.stringify(apartments));

      console.log('Apartment Data Submitted:', apartmentData);

      // Navigate to the Home page after successful submission
      this.router.navigate(['/home']);
    } else {
      console.log('Form is invalid');
    }
  }
  // Navigate back to the home page
  goBack(): void {
    this.router.navigate(['/']); // Navigate to the home page (route path '/')
  }
}
