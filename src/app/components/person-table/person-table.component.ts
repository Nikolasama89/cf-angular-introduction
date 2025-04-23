import { Component, Input } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-person-table',
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent {
  @Input() personInput: Person | undefined
  name = "Margie"

  person = {
    givenName: "Margie",
    surname: "Dmtk",
    age: 33,
    email: "margie@aueb.gr"
  }
}
