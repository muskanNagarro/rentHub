import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // To handle ngModel for form binding
import { AppRoutingModule } from './app-routing.module';  // For routing setup
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FilterPipe } from './filter.pipe';  // The custom pipe for filtering apartments
import { AddApartmentComponent } from './add-apartment/add-apartment.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,  // Custom pipe to filter apartments
    AddApartmentComponent,
    ApartmentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,  // Import FormsModule for ngModel two-way binding in forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
