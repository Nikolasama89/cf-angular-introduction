import { Component, Input } from '@angular/core';
import { EPerson } from 'src/app/shared/interfaces/eperson';
import { Person } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-person-table',
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent {
  @Input() personInput: Person | EPerson | undefined
  name = "Margie"

  person = {
    givenName: "Margie",
    surname: "Dmtk",
    age: 33,
    email: "margie@aueb.gr",
    
  }
  addressOrEducation: string | undefined;

  isPerson(): boolean {
    if (this.personInput && 'address' in this.personInput) {
      this.addressOrEducation = this.personInput.address;
      return true;
    }
    return false;
  }
 
  isEPerson(): boolean {
    if (this.personInput && 'education' in this.personInput) {
      this.addressOrEducation = this.personInput.education;
      return true;
    }
    return false;
  }
}
